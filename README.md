# kdae-panel

`kdae-panel` 是面向 [dae](https://github.com/daeuniverse/dae) 及其兼容分支的零侵入式 Web 管理面板。

项目不引用 dae 的内部 Go 包，也不读取其内部 eBPF Map，而是只通过公开命令、配置文件、systemd 和 journald 完成管理。这样可以最大限度降低 dae 上游升级带来的适配成本。

## 设计原则

- 通过 `dae export outline` 动态发现当前版本的配置能力。
- 通过 `dae validate` 校验配置，面板不自行复制 dae 的完整语法规则。
- 配置写入采用临时文件、备份、原子替换和失败回滚。
- 只执行预定义的系统操作，不向 Web 请求暴露任意 Shell 执行能力。
- 前端编译后嵌入 Go 二进制，部署机器不需要 Node.js。

## 当前状态

项目处于主动开发阶段。当前已提供：

- Go HTTP 服务与优雅退出；
- `/api/v1/health` 健康检查；
- `/api/v1/dae/capabilities` 自动探测 dae 版本和公开命令；
- `/api/v1/dae/outline` 转发当前 dae 的动态配置结构；
- 命令超时及输出大小限制，所有调用均绕过 Shell；
- 内嵌 Web 资源；
- Go 与 Vue 的基础构建流程。

## 本地开发

需要 Go 1.24+ 和 Node.js 22+。

```bash
npm --prefix web install
npm --prefix web run build
go run ./cmd/kdae-panel
```

默认监听 `127.0.0.1:2023`，可通过参数或环境变量调整：

```bash
kdae-panel --listen 0.0.0.0:2023
KDAE_PANEL_LISTEN=0.0.0.0:2023 kdae-panel
```

指定 dae 二进制：

```bash
kdae-panel --dae-binary /usr/bin/dae
KDAE_PANEL_DAE_BINARY=/usr/local/bin/dae kdae-panel
```

## 许可证

GNU Affero General Public License v3.0，详见 [LICENSE](LICENSE)。
