# HTTP API

所有接口以 `/api/v1` 为前缀，响应使用 UTF-8 JSON。除健康检查、认证状态、首次初始化和登录外，接口都需要有效会话。

## 认证

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/auth/status` | 初始化和登录状态 |
| `POST` | `/auth/bootstrap` | 将一次性初始化链接中的 token 兑换为短时 HttpOnly Cookie |
| `POST` | `/auth/setup` | 使用短时初始化授权创建首个管理员，仅可成功一次 |
| `POST` | `/auth/login` | 登录并设置 HttpOnly Cookie |
| `POST` | `/auth/logout` | 注销当前会话 |
| `POST` | `/auth/password` | 修改密码并注销旧会话 |

登录、初始化和状态响应会返回 `csrfToken`。所有已登录的非只读请求必须增加：

```http
X-CSRF-Token: <csrfToken>
```

浏览器会话 Cookie 名为 `kdae_panel_session`，属性为 `HttpOnly`、`SameSite=Strict`，可配置 `Secure`。

未初始化时，`/auth/status` 会返回 `bootstrapRequired: true`。前端从安装脚本所示 URL 的 `#bootstrap=...` 片段读取 token，调用 `/auth/bootstrap` 兑换一个有效期 10 分钟、`HttpOnly`、`SameSite=Strict` 的初始化 Cookie，并立即从地址栏清除片段。`/auth/setup` 的 JSON 只包含用户名和密码，不再传输 bootstrap token。显式配置 `KDAE_PANEL_BOOTSTRAP_TOKEN` 时，初始化链接会基于该固定值生成；管理员创建成功后，发行单元的临时链接文件会被删除。

## dae 能力

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/health` | 面板健康状态和版本 |
| `GET` | `/dae/capabilities` | dae 可用性、版本和命令能力 |
| `GET` | `/dae/outline` | 当前 dae 导出的动态配置结构 |

## 配置

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/config` | 入口配置文本、SHA-256 和文件元数据 |
| `POST` | `/config/validate` | 只校验候选内容 |
| `PUT` | `/config` | 保存候选内容，可选择立即重载 |
| `GET` | `/config/backups` | 列出自动备份和手动配置存档 |
| `POST` | `/config/backups` | 将当前入口配置保存为带名称、备注的手动存档 |
| `PUT` | `/config/backups/{id}` | 修改存档名称和备注 |
| `DELETE` | `/config/backups/{id}` | 删除存档内容及其元数据 |
| `GET` | `/config/backups/{id}/export` | 以 `.dae` 文件导出存档原始内容 |
| `GET` | `/config/backups/{id}/preview` | 对比存档与当前配置，并用当前 dae 预先校验 |
| `POST` | `/config/backups/{id}/restore` | 恢复指定备份或存档 |

创建和编辑存档请求体：

```json
{
  "name": "稳定线路",
  "note": "家庭网络使用"
}
```

`name` 必填，去除首尾空白后最多 80 个字符；`note` 可选，最多 500 个字符。没有名称和备注的旧备份在前端显示为“自动备份”，也可以通过编辑接口补充。备份内容仍是独立的 `.dae` 文件，名称和备注保存在同编号的 `.meta.json` 文件中；导出保持配置原始字节不变，不执行校验或重载；删除存档会同时删除内容与元数据，前端支持多选后批量调用删除接口。

保存示例：

```json
{
  "content": "global { ... }\nrouting { fallback: direct }\n",
  "expectedHash": "提交编辑前读取到的 SHA-256",
  "apply": true
}
```

入口配置已经存在时，`expectedHash` 必填且不匹配时返回 HTTP `409`，防止覆盖外部修改；新建入口配置时必须为空。`apply` 默认为 `true`。

`apply=true` 且 dae 正在运行时，面板读取 systemd `MainPID` 并执行 `dae reload <MainPID>`，不依赖默认 PID 文件。dae 未运行时配置仍会保存成功，响应包含 `"deferred": true`，表示下次启动时读取；真正的 reload 错误仍会恢复旧磁盘配置并返回 `configuration_apply_failed`。

配置保存、备份恢复和服务控制操作会共享串行门；已有操作执行时返回 `409 operation_in_progress`，避免多个控制动作交叉执行。

所有备份（包括手动存档）共用最多 50 份、总大小 256 MiB 的保留上限。达到上限时按文件创建时间清理最旧的备份，手动存档的元数据会随对应内容一起清理。

恢复前应先请求 `GET /config/backups/{id}/preview`。响应包含存档元数据、当前配置哈希、`same`、`valid`、校验错误和逐行 `diff`；前端以 `currentHash` 作为恢复请求的乐观锁。精确差异使用有边界的行级比较，最多返回 4000 行；输入超过 5 万行时不展开差异，但仍完整执行 dae 配置校验。预览不能代替恢复事务内的最终校验，磁盘在两次请求之间变化时恢复会返回 `409 configuration_conflict`。

常见错误码：

| HTTP | code | 含义 |
|---|---|---|
| `400` | `configuration_backup_invalid` | 存档名称或备注不符合长度要求 |
| `409` | `configuration_conflict` | 磁盘内容已经变化 |
| `422` | `configuration_invalid` | dae 拒绝候选配置 |
| `502` | `configuration_apply_failed` | 保存后重载失败，响应包含回滚状态 |

## dae 版本管理

默认开启。显式设置 `KDAE_PANEL_ENABLE_DAE_INSTALL=false` 时，以下接口一律返回 `503 dae_install_disabled`。

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/dae/install` | 当前安装状态与正在进行的任务 |
| `GET` | `/dae/versions?source=official\|kdae` | 列出上游与本地版本 |
| `GET` | `/dae/compatibility` | 读取当前版本预检任务 |
| `POST` | `/dae/compatibility` | 下载并预检指定版本，不替换当前二进制 |
| `POST` | `/dae/install` | 开始安装指定版本 |
| `DELETE` | `/dae/cache` | 删除指定版本的本地缓存 |
| `POST` | `/dae/rollback` | 回滚到上一版本 |
| `POST` | `/dae/uninstall` | 卸载面板管理的 dae，可选清理配置与 geo 数据 |

安装请求体：

```json
{ "source": "kdae", "ref": "30187784287", "label": "d63a0c1" }
```

兼容性预检使用相同请求体，立即返回 `202`。目标二进制会先进入本地版本库，再依次检查 ELF、`--version`、`export outline` 和当前配置 `validate`；全过程不替换 `/usr/bin/dae`，也不启动、停止或重载服务。预检通过不削弱安装事务：真正切换时仍会重新验证缓存摘要和当前配置。预检、安装、回滚、卸载和缓存删除共享版本任务门，同时只能执行一项。

`source` 只接受 `official` 与 `kdae` 两个枚举值，仓库地址在代码中写死，不接受外部指定。`ref` 对官方来源是发布 tag，对 kdae 是构建编号。`GET /dae/versions` 另接受 `limit` 参数（1–100，默认 30），超出范围返回 `400 invalid_limit`。

安装状态分别返回 `architecture`（不含优化等级的 CPU 架构）、`preferredPlatform`（本机首选发布资产）和 `managed.platform`（当前面板账本记录的实际安装资产）。兼容字段 `platform` 仍等于 `preferredPlatform`。上游缺少首选资产时会回退到更保守的构建，因此三者不能混用；旧账本没有实际资产字段时 `managed.platform` 省略，`drifted` 为真时该记录也不再代表磁盘上的文件，客户端都应显示未知而不是用首选值代替。

版本响应在上游字段之外附带 `cached`、`cachedAt`、`cachedBytes`；只存在于本机、不在当前上游清单中的版本还会带 `cachedOnly`。已过期的 kdae 构建只要本地缓存完整仍然可切换；上游暂时不可访问时，只要存在缓存也会返回本地版本。缓存按来源、版本与本机首选构建隔离，并额外记录下载时实际命中的构建变体；真正安装前会重新计算二进制 SHA-256，而不是只信任缓存索引。

GitHub JSON 元数据另有 10 分钟进程内缓存；同 URL 的并发请求只访问上游一次，刷新失败时继续使用最近成功结果。凭据管理端点如下，任何响应都只返回 `configured` 与 `source`，不会返回 Token：

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/settings/github` | 查询是否配置 GitHub Token 及来源（`panel` / `environment`） |
| `PUT` | `/settings/github` | 保存 `{"token":"..."}`，写入 `0600` 独立文件并立即生效 |
| `DELETE` | `/settings/github` | 清除面板保存的 Token；环境变量管理时返回 `409` |

删除缓存请求体：

```json
{ "source": "official", "ref": "v2.0.0" }
```

删除只影响 `/var/lib/kdae-panel/dae-versions/` 下的对应缓存，不修改当前运行的 `/usr/bin/dae`，也不删除安装事务的上一版回滚点。当前安装账本正在使用的版本禁止删除，返回 `409 cached_version_in_use`；版本不存在返回 `404 cached_version_not_found`。

机器上还没有 dae 时，`GET /dae/install` 的响应会附带 `provision` 字段，说明首次安装是否可行、将要写入哪些路径、以及缺少哪些可写目录。此时提交安装会走首次安装：除可执行文件外还写入 geo 数据、种子配置与 systemd 单元，然后 `daemon-reload`，但**不会启动服务**。

任务进行中（`downloading`/`applying`）的响应**不含** `provision`：该字段要靠实际试写目标目录才能算出来，而界面每两秒轮询一次，其中一个探测目标正是 systemd 在 inotify 监视的单元目录。客户端应沿用上一次拿到的值，而不是当作"首次安装已不可行"。

安装、回滚与卸载都立即返回 `202` 与任务快照，由客户端轮询 `GET /dae/install` 获取进度。安装任务依次经过 `downloading`、`applying`；命中本地版本时仍从 `downloading` 开始，但任务会带 `cached: true` 并很快进入替换阶段。回滚与卸载直接进入 `applying`，终态均为 `done` 或 `failed`。同一时刻只允许一个版本管理任务，重复提交返回 `409 install_in_progress`。

卸载请求体可选，零值是安全默认：

```json
{ "purgeConfig": false, "purgeGeo": false }
```

`purgeConfig` 与 `purgeGeo` 相互独立，只有显式设为 `true` 才删除对应数据。geo 清理覆盖 dae 搜索路径里所有面板可见的副本，受 `ProtectHome=true` 隐藏的 `/root/.local/share/dae` 不在其中。卸载只接受面板有安装账本且二进制摘要未漂移的 dae，并要求 systemd 单元位于面板管理的标准路径。它会停止并禁用 dae，移除可执行文件、服务单元与版本回滚记录；文件移除、可选的数据清理与 `daemon-reload` 属于同一事务，失败时会恢复文件、开机启动状态和原运行状态。

读取缓存、下载与校验不占用全局控制门，只有替换与按需重启阶段才进入串行区，避免几十兆的 I/O 把配置保存一并堵住。普通升级和切换仍需完整下载并校验上游发布包，但只解压可执行文件，不再浪费时间和内存解压首次安装物料；下载成功后会缓存二进制，后续切换直接使用本地版本。首次安装还需要服务单元与 geo，因此即使该版本已有二进制缓存，也会重新取得并校验完整发布包。种子配置由面板内置，不依赖上游是否附带 `empty.dae`。

校验和缺失或格式不符时拒绝安装，没有跳过校验的开关。kdae 的构建产物保留 90 天，过期版本在列表中标记为不可安装；面板只接受本仓库自己的构建，解析时会重新核对 `head_repository`、事件类型、分支与工作流文件路径四项。

## geo 数据更新

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/dae/geo` | geo 数据现状、可选来源与正在进行的任务 |
| `POST` | `/dae/geo` | 更新到指定来源的最新版 |
| `POST` | `/dae/geo/residuals/cleanup` | 清理不承载唯一旧数据的事务残留 |
| `POST` | `/dae/geo/residuals/restore` | 恢复正式文件缺失时的旧数据回滚点 |
| `GET` | `/dae/geo/sources` | 列出管理员保存的自定义来源 |
| `POST` | `/dae/geo/sources` | 添加自定义来源 |
| `PUT` | `/dae/geo/sources/{id}` | 修改自定义来源 |
| `DELETE` | `/dae/geo/sources/{id}` | 删除未在使用的自定义来源 |

Geo 数据管理在登录后始终可用，与 dae 版本管理互不影响；旧版环境文件里的 `KDAE_PANEL_ENABLE_GEO_UPDATE` 仅为启动参数兼容保留，不再隐藏功能。

更新请求体（可省略，此时沿用 `status.defaultSource`）：

```json
{ "source": "loyalsoldier" }
```

`source` 接受内置的 `loyalsoldier`、`v2fly`，或由来源管理接口生成的 `custom:<id>`；未知或已经删除的来源返回 `400 invalid_geo_source`。不同来源的规则集可能不同，切换会改变 `geosite:` 规则匹配的域名集合。

自定义来源请求体包含 `label`、`geoipUrl`、`geoipSha256Url`、`geositeUrl`、`geositeSha256Url`。四条地址都必须是公网 HTTPS；保存时拒绝 userinfo、内网字面地址与 URL 片段，下载首跳和每次重定向会重新解析 DNS，并在实际连接前再次拒绝非公网地址。自定义请求使用独立客户端，不携带 GitHub Token。每个数据文件上限 64 MiB，校验文件上限 64 KiB，没有跳过 SHA-256 的开关。来源保存在权限 `0600` 的 `KDAE_PANEL_GEO_SOURCES_FILE`；当前更新记录正在引用的来源不能直接删除，需先用另一个来源成功更新。

`GET` 返回 `status.sources`（每个来源的标识、展示名、全部信任根仓库与说明）、`status.defaultSource`（界面该预选哪个——用过就是上次那个）、`status.searchPath`（dae 的完整查找顺序），以及每个文件的实际路径、大小、`targetPath` 和 `shadowed` 副本。两个文件可能分别在不同目录生效，因此写入位置以各自的 `targetPath` 为准；兼容字段 `status.targetDir` 仅在两者同目录时有值。

异常退出可能留下 `status.residuals`。Geo 专属暂存文件超过一小时才会被认定为残留，可由清理端点删除，下一次更新也会自动清理；固定后缀 `.kdae-panel-previous` 是旧数据回滚点。正式文件缺失时只能调用恢复端点（请求体为 `{ "path": "..." }`），正式文件仍在时才允许清理。两个动作都会重新扫描并验证路径、使用全局控制门，客户端不能借此操作任意文件。

`POST` 立即返回 `202` 与任务快照，进度靠轮询 `GET /dae/geo`，阶段与安装任务一致（`downloading` → `applying` → `done`/`failed`）。同一时刻只允许一个 geo 任务，重复提交返回 `409 geo_update_in_progress`；它与安装任务各有各的任务槽，但落盘阶段共用全局控制门。

dae 正在运行时，更新会把 systemd 的 `MainPID` 显式传给 `dae reload`，不依赖 `/var/run/dae.pid`，也不重启服务。dae 未运行时只更新文件并成功结束，下一次启动会直接读取新数据；此时无法借助 reload 检查配置引用的 Geo 分类是否存在，若新数据仍缺少分类，下一次启动仍会失败。若运行中的 dae 不接受新数据，面板会自动还原旧文件并再 reload 一次，任务标记为 `failed`。

dae 的 `validate` 不检查 `geoip:` / `geosite:` 分类是否真实存在。Geo 更新重载、启动、重启或版本切换因分类缺失失败时，面板会从 dae 命令输出或本次操作后的 journald 日志明确指出缺失分类并引导到 Geo 数据页；版本切换仍按原事务回滚二进制。

## 定时任务（订阅自动刷新 / geo 自动更新）

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/schedule/reload` | 读取订阅自动刷新的设置与执行状态 |
| `PUT` | `/schedule/reload` | 更新订阅自动刷新设置 |
| `GET` | `/schedule/geo` | 读取 geo 自动更新的设置与执行状态 |
| `PUT` | `/schedule/geo` | 更新 geo 自动更新设置 |

两组端点的请求与响应完全同构。geo 自动更新随 `KDAE_PANEL_ENABLE_GEO_UPDATE` 一起出现，
到点后重新下载校验并只 reload 不重启；来源沿用面板记录的上一个，绝不自动切换规则集。

```json
{
  "enabled": true,
  "intervalMinutes": 1440
}
```

响应在此基础上追加 `lastRunAt`、`lastError` 和 `nextRunAt`。

dae 只在重载时重新拉取 `subscription` 链接，因此"订阅定时刷新"的实现就是按间隔执行一次 `dae reload`。每轮开始前尝试获取全局控制锁，锁被占用时跳过当轮并把原因记入 `lastError`，不会与用户发起的操作交叉。

间隔取值范围为 5 分钟到 30 天。设置与上次执行时间一起持久化（订阅刷新在 `KDAE_PANEL_SCHEDULE_FILE`，geo 在 `KDAE_PANEL_GEO_SCHEDULE_FILE`），下一轮按"上次执行 + 间隔"排期，因此面板重启或提交无变化的设置都不会把倒计时重新拉满；停机期间错过的轮次会在启动一分钟后补做。

重载应用的是磁盘上的当前配置，所以之前用 `apply: false` 保存但未应用的改动会随这次刷新一并生效。

普通订阅的缓存由 dae 负责：把链接的 scheme 写成带 `-file` 后缀的形式（如 `https-file://`），dae 会将拉取成功的内容保存到 `config_dir/persist.d/<tag>.sub`，并在后续拉取失败时回退使用。需要指定 User-Agent 的托管订阅由面板下载到 `config_dir/managed.d`；Base64、URI、SIP008 内容直接兼容，Clash/Mihomo YAML 会先转换成 dae 可读取的 Base64 URI 列表。刷新或转换失败时保留上一份有效缓存。

`GET /subscriptions/nodes` 返回现有缓存中的订阅来源和带稳定名称的节点。每个节点只包含 `name`、`protocol`、`host` 与同名匹配数 `matches`，不会返回分享链接、密码或 UUID。缓存缺失时该来源不出现在结果中；单个缓存损坏、超限或不是普通文件时，来源带 `problem`，不会影响其他缓存。单文件上限 8 MiB、来源上限 128 个、节点名称上限 4096 个。

## 面板自身更新

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/panel/update` | 新版本检查结果与自升级状态 |
| `POST` | `/panel/update/check` | 立即绕过缓存检查面板新版本 |
| `PUT` | `/panel/update/preference` | 在 UI 中持久化一键升级开关与更新通道 |
| `POST` | `/panel/update` | 触发一键自升级 |

`GET` 响应里的 `check` 含 `current`、`latest`、`updateAvailable`、`checkedAt`，检查失败时带 `error`；
结果按 TTL 缓存（成功 6 小时、失败 15 分钟），dev 构建不发起检查，
`KDAE_PANEL_DISABLE_UPDATE_CHECK=true` 时不再联网、恒不提示。
手动检查接口返回同样的 `check`、`status` 与 `job` 结构，会绕过成功缓存；同一面板在 1 分钟冷却期内重复调用直接返回上次结果。

正式部署的响应始终带 `status`（`enabled`、`channel`、是否可升级、二进制路径、上一版副本位置）
与 `job`（任务进度）。`PUT /panel/update/preference` 接受 `{"enabled":true|false}` 或
`{"channel":"stable"|"preview"}`，
原子保存到面板数据目录并返回新状态；关闭时 `POST` 返回 `409 panel_self_update_disabled`。

`stable` 只检查正式发布；`preview` 检查最近的非草稿 Release，包含 prerelease。
`POST` 可选 `{"version":"v0.2.0"}`，省略则取当前通道检查出的最新版；立即返回 `202` 并在后台执行：
下载 → 比对 `SHA256SUMS` → 新二进制 `-version` 自证 → 备份上一版 → 原子替换 →
`systemctl restart --no-block` 重启自身。下载、校验、自证或备份失败时原文件不动；
原子改名后的目录同步或重启请求失败则可能已经留下新二进制，任务会明确报错并要求人工确认或重启。

**没有自动回滚**：被替换、被重启的是当前进程自己，systemd 停掉它之后无从补救。
上一版副本保留在 `KDAE_PANEL_BACKUP_FILE`，还原步骤见 [deployment.md](deployment.md)。

## 网络探测

| 方法 | 路径 | 说明 |
|---|---|---|
| `POST` | `/net/latency` | 探测节点主机延迟：公网使用 ICMP，内网使用 TCP |

请求与响应示例：

```json
{
  "targets": [
    { "host": "hk.example.com", "port": 443 }
  ]
}
```

```json
{
  "results": [
    {
      "host": "hk.example.com",
      "port": 443,
      "reachable": true,
      "latencyMs": 42.7,
      "resolvedIp": "203.0.113.8",
      "method": "icmp"
    }
  ]
}
```

单次最多 64 个目标，单目标总预算 4 秒，同一时刻最多 16 个并发目标（上限属于面板进程，多个并发请求共享）。域名先解析且不计入延迟；`resolvedIp` 是本轮实际选择的地址，`method` 标明结果来自 `tcp` 还是 `icmp`。

公网地址一律发送三次 ICMP Echo 并返回中位数，不经过 dae 接管的 TCP/UDP 路径；ICMP 不通时明确返回无法测量，不回退到可能经过当前代理的 TCP。这个结果只表示节点主机的网络 RTT，不验证代理端口或协议可用性。内网、回环和链路本地地址则测三次 TCP 握手中位数，它们可能合法地低于 1 ms。两种方式都不包含名称解析时间。

内网 TCP 探测 Socket 仍设置 dae 从 v1 系列起保留的 `0x100` 绕行 Mark。公网不使用任何延迟阈值判断：无论当前连接的是日本、美国或其他代理节点，TCP 都不会参与公网延迟结果，因此代理转发路径不会制造“看似合理但仍偏低”的数值。

ICMP ping socket 通常受系统的 `ping_group_range` 控制；发行单元同时保留 `CAP_NET_RAW`，确保不同发行版上行为一致。旧安装通过面板自升级二进制后若看到 ICMP 权限错误，需要重新执行一次一键安装命令以更新 systemd 单元。

单个目标不合法只影响它自己那条结果（`reachable: false` 并带 `error`），不会让整批探测失败；只有请求为空或超过 64 个目标才返回 `400`。目标列表会记入面板日志以供审计。

目标地址来自管理员自己的 dae 配置，可能合法指向内网或回环地址，因此服务端不按地址段过滤；该端点与其他写接口一样要求有效会话与 CSRF 令牌。

## 服务与日志

### 故障诊断

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/diagnostics/report` | 汇总 dae、配置、Geo、网络、内核、eBPF 基础条件与近期异常日志 |
| `GET` | `/diagnostics/sysdump` | 调用 dae 公开命令导出原始 sysdump 归档 |

诊断报告的每个检查项都包含 `level`（`ok` / `warning` / `error` / `unknown`）、摘要、证据详情和可选建议。独立检查并发执行，单个子系统不可读时对应项目记为 `unknown`，不会让整份报告返回 `500`。日志范围取当前服务周期与最近 30 分钟中的较短者，最多展示 12 条异常；正常 reload 生命周期的 warning 会被降噪。报告只使用 dae 公开命令、systemd、journald、当前配置、Geo 状态及 Linux `/proc`、`/sys` 标准接口，不读取 dae 内部 eBPF Map。

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/host/interfaces` | 本机网络接口及其 IP/CIDR 地址，供 global 接口选择器使用 |
| `GET` | `/service` | systemd 状态与资源数据 |
| `POST` | `/service/actions/start` | 启动 dae，并设为随系统启动 |
| `POST` | `/service/actions/stop` | 停止 dae，并取消随系统启动 |
| `POST` | `/service/actions/restart` | 重启 dae |
| `POST` | `/service/actions/reload` | 运行中按 systemd MainPID 执行 `dae reload`；未运行则返回延后状态 |
| `POST` | `/service/actions/suspend` | 执行 `dae suspend` |
| `GET` | `/logs?limit=200` | 最近 1–500 条 journald 日志 |
| `GET` | `/connections?limit=500&window=15` | 连接建立流水、历史分布、当前日志级别与 dae 出站端点；条数 1–2000，时间窗 1–1440 分钟 |

所有动作名和参数都由服务端白名单决定。URL、请求体和查询参数都不能注入额外命令参数。

连接活动响应把两个不同口径的数据明确分开：

| 字段 | 来源 | 含义 |
|---|---|---|
| `entries` | dae `info` 级别的连接日志 | 历史建立流水，包含源、目的、嗅探域名、出站、节点、策略、进程和 MAC |
| `facets.targets` / `nodes` / `groups` | 同上 | 所选时间窗内按目标、`dialer` 和 `outbound` 聚合的新建连接数 |
| `facets.clients` | 同上 | 有效单播 MAC 作为稳定键、最新 IP 作为标签；无有效 MAC 时按 IP 聚合 |
| `endpoints` | `/proc/net/tcp{,6}` 与 `/proc/<pid>/fd` | dae 此刻持有的 ESTABLISHED TCP socket，按远端 `IP:端口` 聚合 |
| `summary.outboundTcp` | 同上 | dae 当前持有的 ESTABLISHED TCP socket 总数 |
| `summary.udpSockets` | `/proc/net/udp{,6}` | dae 当前持有的 UDP socket 总数 |
| `summary.sampledTcpPeak` / `sampledUdpPeak` | 最近成功的 procfs 快照 | `socketWindowSeconds` 秒内实际采样到的峰值；dae PID 变化后清空 |
| `summary.windowEvents` / `windowClients` / `windowTargets` | 面板内存 | 所选时间窗内保留的事件、客户端和目标数 |

`logsOk` 与 `snapshotOk` 分别表示两个来源是否可用；任一来源失败不会抹掉另一边的数据。`serviceRunning` 根据 systemd MainPID 区分“dae 未运行”和“运行中但当前未捕获”，`socketWindowSeconds` 给出离散采样峰值窗口。`logLevel` 来自当前配置的 `global.log_level`，字段省略时按 dae 默认值 `info` 返回，无法可靠读取时省略。`warn` 或 `error` 不会产生连接建立流水，页面会保留实时 socket 快照并提供经配置事务切换到 `info` 的入口。日志事件在内存中最多保留 2000 条、最长 24 小时，面板重启后从当前 journald 窗口重新积累。分布在明细条数裁剪前计算，每个维度最多返回前 200 项，超限时 `facetLimited=true`。`truncated=true` 表示部分明细或端点不完整，页面计数只能基于面板当前保留或扫描到的数据。解析器拒绝未知协议与残缺连接行，只接收 `info` 事件；只有同时包含 `<->` 与连接元数据的候选行解析失败才计入 `dropped`，Netkit 设备对等普通生命周期日志不会制造误报。

`endpoints` 是远端地址分布，不是节点名称映射：同一节点可能解析成多个地址，直连流量也可能完全留在 eBPF 数据面而不产生 dae userspace socket。当前值为零只表示这次离散采样没有命中，不能推出“没有代理流量”；峰值同样只汇总实际采样，不填补采样间隙。dae 没有公开逐条连接状态接口，因此 API 不提供 `live`、`closed` 一类猜测值。端点只读取 journald 与 Linux procfs，不读取 dae/kdae 内部 eBPF Map；与其他管理接口一样只允许已登录管理员访问。

## 错误格式

```json
{
  "error": {
    "code": "configuration_invalid",
    "message": "dae 配置校验失败：..."
  }
}
```

认证失败返回 `401`，CSRF 或来源检查失败返回 `403`，登录限速返回 `429` 并带 `Retry-After`。
