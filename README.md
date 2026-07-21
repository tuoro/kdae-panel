# kdae-panel

`kdae-panel` 是面向 [dae](https://github.com/daeuniverse/dae) 及其兼容分支的零侵入式 Web 管理面板。

面板不引用 dae 的内部 Go 包，也不读取其内部 eBPF Map。它只依赖 dae 的公开命令、`.dae` 配置文件、systemd 和 journald，因此 dae 内部重构、协议实现变化和普通配置字段新增通常不需要同步修改面板。

## 功能

- 通过 `dae export outline` 动态发现当前版本的配置结构；
- systemd 服务状态、启动、停止和重启；
- dae 无损重载、暂停和 sysdump 诊断；
- 原始配置编辑、独立校验、并发冲突检测和事务保存；
- 保存前备份、原子替换及重载失败后的磁盘回滚；
- 配置历史浏览与指定版本恢复；
- journald 结构化日志浏览、搜索和级别筛选；
- SQLite 管理员账户、Argon2id 密码摘要和服务端会话；
- SameSite/HttpOnly Cookie、CSRF 校验、同源检查和登录限速；
- Vue 3 响应式管理界面，前端资源嵌入单个 Go 二进制；
- Linux `amd64`、`arm64` 和 `riscv64` 发布构建。

## 快速安装

依赖 Go 1.24+、Node.js 22+，运行环境需要 systemd，并预先安装可正常运行的 dae。

```bash
git clone https://github.com/tuoro/kdae-panel.git
cd kdae-panel
npm ci --prefix web
make build
sudo ./scripts/install.sh
```

默认只监听 `127.0.0.1:2023`。首次访问建议使用 SSH 端口转发：

```bash
ssh -L 2023:127.0.0.1:2023 root@router.example
```

然后打开 `http://127.0.0.1:2023` 创建管理员账户。

首次启动会在服务日志中生成 bootstrap token。通过 systemd 安装时可执行 `sudo journalctl -u kdae-panel -n 20 --no-pager` 查看；创建管理员后初始化接口会永久关闭。

## 开发

```bash
npm install --prefix web
npm run build --prefix web
go run ./cmd/kdae-panel \
  --database ./data/panel.db \
  --backup-dir ./data/backups \
  --dae-config ./data/config.dae
```

前后端分离开发：

```bash
# 终端一
go run ./cmd/kdae-panel --database ./data/panel.db

# 终端二，Vite 会代理 /api 到 127.0.0.1:2023
npm run dev --prefix web
```

验证全部代码：

```bash
npm run typecheck --prefix web
npm run build --prefix web
go test ./...
go vet ./...
```

## 上游兼容

面板启动后直接执行当前安装的 dae：

```text
dae --version
dae --help
dae export outline
dae validate -c <候选配置>
dae reload
dae suspend
dae sysdump
```

配置字段和默认值来自 `export outline`，配置正确性以 `validate` 的结果为准。面板不会复制 dae 的完整配置模型，也不会将未知配置字段静默删除。

完全零适配无法覆盖上游主动删除公开命令或改变命令语义的情况。CI 会持续验证面板自身契约；建议对生产环境的 dae 版本进行固定，并在升级前使用新二进制验证现有配置。

## 文档

- [架构与兼容策略](docs/architecture.md)
- [安装部署与升级](docs/deployment.md)
- [HTTP API](docs/api.md)
- [安全策略](SECURITY.md)

## 许可证

GNU Affero General Public License v3.0，详见 [LICENSE](LICENSE)。
