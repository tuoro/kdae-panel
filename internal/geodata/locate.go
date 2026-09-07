package geodata

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strings"
	"time"

	"github.com/tuoro/kdae-panel/internal/atomicfile"
	"github.com/tuoro/kdae-panel/internal/host"
	"github.com/tuoro/kdae-panel/internal/upstream"
)

// Names 是 dae 会查找的两个 geo 数据文件。
var Names = []string{upstream.GeoIPName, upstream.GeoSiteName}

// SandboxHiddenDir 是搜索顺序里面板永远看不到的那一位。
//
// dae 以 root 运行时会读 $HOME/.local/share/dae，而面板单元设了 ProtectHome=true，
// systemd 把 /root 换成一个空且不可访问的目录，面板也没有 CAP_DAC_OVERRIDE 可以绕。
// 仍然把它列进搜索顺序，是因为 dae 确实读这里；但"面板看不到"不等于"文件不存在"，
// 为一个少见的 geo 目录把整个 /root 敞开给这个 root 服务不划算。
const SandboxHiddenDir = "/root/.local/share/dae"

// systemDirs 是 dae 搜索顺序里排在配置目录之后的固定系统目录。
//
// 独立成变量是给测试留的缝：这些绝对路径在跑测试的机器上可能真的存在
// （开发者装过 dae 的 /usr/local/share/dae；Windows 上还会按当前盘符解析），
// 测试必须能把它们清空——否则"就地更新实际生效的那一份"会把开发者机器上
// 真实的 geo 文件当成更新目标，go test 一跑就把它们覆写掉。
var systemDirs = []string{
	SandboxHiddenDir,
	"/usr/local/share/dae",
	"/usr/share/dae",
}

// SearchPath 复刻 dae 查找 geo 数据文件的顺序。
//
// 最高优先级是 DAE_LOCATION_ASSET 指定的目录，其次是配置文件所在目录
// （dae 用 filepath.Dir(cfgFile) 作为 externDirs），之后才轮到那几个系统目录。
// 顺序错了后果很实际：往低优先级目录写的更新永远不会生效，而检查却显示已就位。
//
// environment 是 dae 单元声明的环境变量，可以为 nil。
// 返回值按清理后的路径去重，避免同一目录被误报为自己的遮蔽副本。
func SearchPath(configPath string, environment map[string]string) []string {
	candidates := make([]string, 0, len(systemDirs)+2)
	if directory := environment[LocationAssetEnv]; directory != "" {
		candidates = append(candidates, directory)
	}
	if configPath != "" {
		candidates = append(candidates, filepath.Dir(configPath))
	}
	candidates = append(candidates, systemDirs...)

	paths := make([]string, 0, len(candidates))
	for _, directory := range candidates {
		directory = filepath.Clean(directory)
		if !slices.Contains(paths, directory) {
			paths = append(paths, directory)
		}
	}
	return paths
}

// MissingWarning 在面板可见的目录里都找不到 geo 数据时提醒，找得到就返回空。
//
// 必须提醒：dae 只在路由规则用到 geosite/geoip 时才读它们，但一旦用到而文件
// 不在，dae 会直接启动失败，且 dae validate 完全察觉不到——它只读配置文件。
//
// 措辞留有余地：SandboxHiddenDir 对面板不可见，文件可能就在那里而 dae 读得好好的，
// 说死"未找到"会把一个正常运行的系统报成故障。
func MissingWarning(searchPath []string) string {
	for _, file := range locate(searchPath, Names) {
		if !file.Present {
			return fmt.Sprintf("在面板可见的目录里未找到 geoip.dat / geosite.dat；"+
				"%s 受面板单元 ProtectHome=true 限制读不到，文件若在那里 dae 仍能读到。"+
				"确实缺失且路由规则用到 geosite/geoip 时，dae 将无法启动", SandboxHiddenDir)
		}
	}
	return ""
}

type serviceSnapshot struct {
	status  host.Status
	state   ServiceState
	problem string
}

// inspectService 同时提供 geo 搜索路径所需的环境变量，以及 reload 所需的 PID。
func (m *Manager) inspectService(ctx context.Context) serviceSnapshot {
	if m.service == nil {
		return serviceSnapshot{state: ServiceStateUnknown}
	}
	status, err := m.service.Status(ctx)
	if err != nil {
		return serviceSnapshot{
			state:   ServiceStateUnknown,
			problem: fmt.Sprintf("无法确认 dae 服务状态（%v）；更新时将使用 dae 默认的 PID 文件", err),
		}
	}
	if status.ActiveState == "active" && status.MainPID > 0 {
		return serviceSnapshot{status: status, state: ServiceStateActive}
	}
	if status.ActiveState == "active" {
		return serviceSnapshot{
			status:  status,
			state:   ServiceStateUnknown,
			problem: "dae 服务显示为 active，但 systemd 没有提供有效 MainPID；更新时将使用 dae 默认的 PID 文件",
		}
	}
	return serviceSnapshot{status: status, state: ServiceStateInactive}
}

// locate 沿搜索顺序找出每个文件实际生效的那一份，以及被它遮蔽的其余副本。
func locate(searchPath []string, names []string) []File {
	files := make([]File, 0, len(names))
	for _, name := range names {
		file := File{Name: name}
		var effective os.FileInfo
		for _, directory := range searchPath {
			candidate := filepath.Join(directory, name)
			info, err := os.Stat(candidate)
			if err != nil || !info.Mode().IsRegular() {
				continue
			}
			if !file.Present {
				modTime := info.ModTime().UTC()
				file.Present, file.Path, file.Size, file.ModTime = true, candidate, info.Size(), &modTime
				effective = info
				continue
			}
			// 同一文件经由重复目录或符号链接出现时并不是被遮蔽的副本，
			// 否则界面会错误建议用户删除唯一生效的 Geo 文件。
			if os.SameFile(effective, info) {
				continue
			}
			// dae 只读优先级最高的那一份，其余的既占磁盘，又会让人以为
			// "我明明更新了却没生效"——必须显式列出来。
			file.Shadowed = append(file.Shadowed, candidate)
		}
		files = append(files, file)
	}
	return files
}

// assignTargets 逐文件选出本次更新的落盘位置。
//
// 规则是"就地更新实际生效的那一份"，而不是无脑写死某个目录：dae-installer 把
// geo 装在 /usr/local/share/dae，若面板改往配置目录写，会生成一份优先级更高的
// 副本，从此用户跑上游更新脚本将毫无效果且没有任何提示。
//
// 某个文件不存在时才让该文件退回配置目录——它在搜索顺序里优先级最高（仅次于
// DAE_LOCATION_ASSET），且本来就在面板的 ReadWritePaths 里，不必放宽沙箱。
func assignTargets(files []File, fallback string) {
	for index := range files {
		if files[index].Present {
			files[index].TargetPath = files[index].Path
		} else {
			files[index].TargetPath = filepath.Join(fallback, files[index].Name)
		}
	}
}

func commonTargetDir(files []File) string {
	var common string
	for _, file := range files {
		directory := filepath.Dir(file.TargetPath)
		if common == "" {
			common = directory
			continue
		}
		if directory != common {
			return ""
		}
	}
	return common
}

// Status 汇报 geo 数据的现状与可更新性。
func (m *Manager) Status(ctx context.Context) Status {
	service := m.inspectService(ctx)
	search := SearchPath(m.configPath, service.status.Environment)
	files := locate(search, Names)
	configDir := filepath.Dir(m.configPath)
	assignTargets(files, configDir)
	residuals := findResiduals(search)

	status := Status{
		Sources:       m.fetcher.Sources(),
		DefaultSource: upstream.GeoSourceLoyalsoldier,
		TargetDir:     commonTargetDir(files),
		SearchPath:    search,
		Files:         files,
		Residuals:     residuals,
		ServiceState:  service.state,
	}
	if service.problem != "" {
		status.Warnings = append(status.Warnings, service.problem)
	}
	if state, err := m.readState(); err == nil && state != nil {
		status.Managed = state
		// 用过哪个就沿用哪个：换来源会改变 geosite: 规则的含义，
		// 每次都把选择重置回默认值等于诱导用户反复来回切。
		if state.Source != "" {
			status.DefaultSource = state.Source
			if !slices.ContainsFunc(status.Sources, func(info upstream.GeoSourceInfo) bool {
				return info.Source == state.Source
			}) {
				status.Warnings = append(status.Warnings,
					fmt.Sprintf("上次使用的 geo 来源 %s 已不存在；自动更新会保持失败而不会静默切换规则集，请先选择一个现有来源手动更新", state.Source))
			}
		}
	}

	for _, residual := range residuals {
		if residual.Kind == ResidualRollback {
			status.Problem = "发现上次 Geo 更新遗留的回滚点；请先恢复缺失的正式文件，或确认当前文件正常后清理回滚点"
			return status
		}
	}
	checked := make(map[string]bool)
	for _, file := range files {
		target := filepath.Dir(file.TargetPath)
		if checked[target] {
			continue
		}
		checked[target] = true
		if err := atomicfile.Writable(target); err != nil {
			status.Problem = fmt.Sprintf(
				"面板无法写入 %s：%v；请在 kdae-panel.service 的 ReadWritePaths 中加入该目录", target, err)
			return status
		}
	}
	status.Updatable = true
	status.Warnings = append(status.Warnings, warnings(files, configDir)...)
	if slices.ContainsFunc(residuals, func(item Residual) bool { return item.Kind == ResidualTemporary }) {
		status.Warnings = append(status.Warnings, "发现异常退出遗留的 Geo 暂存文件；它们不会生效，可直接清理，下一次更新也会自动清理")
	}
	return status
}

// warnings 说明那些"更新会成功、但结果可能出乎意料"的情况。
//
// 缺失文件合并成一条：两个文件都缺时，逐个发一条会得到除文件名外一字不差的
// 两条告警，而写入目录本来就是同一个。被遮蔽的副本各自不同，仍然逐条说明。
func warnings(files []File, configDir string) []string {
	var result []string
	var missing []string
	for _, file := range files {
		if len(file.Shadowed) > 0 {
			result = append(result, fmt.Sprintf(
				"%s 同时存在于多个目录，dae 只读 %s；%v 里的副本不会生效，可以删掉",
				file.Name, file.Path, file.Shadowed))
		}
		if !file.Present {
			missing = append(missing, file.Name)
		}
	}
	if len(missing) > 0 {
		result = append(result, fmt.Sprintf(
			"%s 尚未安装，将写入 %s（dae 搜索顺序里优先级最高的可写目录）",
			strings.Join(missing, "、"), configDir))
	}
	return result
}

func nowUTC() time.Time {
	return time.Now().UTC()
}
