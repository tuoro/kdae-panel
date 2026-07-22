# HTTP API

所有接口以 `/api/v1` 为前缀，响应使用 UTF-8 JSON。除健康检查、认证状态、首次初始化和登录外，接口都需要有效会话。

## 认证

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/auth/status` | 初始化和登录状态 |
| `POST` | `/auth/setup` | 使用 bootstrap token 创建首个管理员，仅可成功一次 |
| `POST` | `/auth/login` | 登录并设置 HttpOnly Cookie |
| `POST` | `/auth/logout` | 注销当前会话 |
| `POST` | `/auth/password` | 修改密码并注销旧会话 |

登录、初始化和状态响应会返回 `csrfToken`。所有已登录的非只读请求必须增加：

```http
X-CSRF-Token: <csrfToken>
```

浏览器会话 Cookie 名为 `kdae_panel_session`，属性为 `HttpOnly`、`SameSite=Strict`，可配置 `Secure`。

未初始化时，`/auth/status` 会返回 `bootstrapRequired: true`。`/auth/setup` 请求必须在 JSON 中提交服务首次启动日志里的 `bootstrapToken`；显式配置 `KDAE_PANEL_BOOTSTRAP_TOKEN` 时使用该固定值。

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
| `GET` | `/config/backups` | 列出自动备份 |
| `POST` | `/config/backups/{id}/restore` | 恢复指定备份 |

保存示例：

```json
{
  "content": "global { ... }\nrouting { fallback: direct }\n",
  "expectedHash": "提交编辑前读取到的 SHA-256",
  "apply": true
}
```

入口配置已经存在时，`expectedHash` 必填且不匹配时返回 HTTP `409`，防止覆盖外部修改；新建入口配置时必须为空。`apply` 默认为 `true`。

配置保存、备份恢复和服务控制操作会共享串行门；已有操作执行时返回 `409 operation_in_progress`，避免多个控制动作交叉执行。

常见错误码：

| HTTP | code | 含义 |
|---|---|---|
| `409` | `configuration_conflict` | 磁盘内容已经变化 |
| `422` | `configuration_invalid` | dae 拒绝候选配置 |
| `502` | `configuration_apply_failed` | 保存后重载失败，响应包含回滚状态 |

## 服务与日志

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/service` | systemd 状态与资源数据 |
| `POST` | `/service/actions/start` | 启动 dae |
| `POST` | `/service/actions/stop` | 停止 dae |
| `POST` | `/service/actions/restart` | 重启 dae |
| `POST` | `/service/actions/reload` | 执行 `dae reload` |
| `POST` | `/service/actions/suspend` | 执行 `dae suspend` |
| `GET` | `/logs?limit=200` | 最近 1–500 条 journald 日志 |
| `GET` | `/diagnostics/sysdump` | 执行 dae sysdump，并以 `application/gzip` 下载生成的归档 |

所有动作名和参数都由服务端白名单决定。URL、请求体和查询参数都不能注入额外命令参数。

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
