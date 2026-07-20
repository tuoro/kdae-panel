#!/usr/bin/env bash
set -euo pipefail

if [[ ${EUID} -ne 0 ]]; then
  echo "请使用 root 权限运行卸载脚本" >&2
  exit 1
fi

systemctl disable --now kdae-panel.service 2>/dev/null || true
rm -f /etc/systemd/system/kdae-panel.service /usr/bin/kdae-panel
systemctl daemon-reload

echo "程序与 systemd 单元已移除。"
echo "配置和账户数据仍保留在 /etc/kdae-panel 与 /var/lib/kdae-panel。"

