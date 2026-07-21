#!/usr/bin/env bash
set -euo pipefail

if [[ ${EUID} -ne 0 ]]; then
  echo "请使用 root 权限运行安装脚本" >&2
  exit 1
fi

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
default_binary="${repo_root}/bin/kdae-panel"
if [[ -x ${repo_root}/kdae-panel ]]; then
  default_binary="${repo_root}/kdae-panel"
fi
binary=${1:-"${default_binary}"}
service_file="${repo_root}/packaging/kdae-panel.service"
environment_file="${repo_root}/packaging/kdae-panel.env"
if [[ ! -f ${service_file} ]]; then
  service_file="${repo_root}/kdae-panel.service"
fi
if [[ ! -f ${environment_file} ]]; then
  environment_file="${repo_root}/kdae-panel.env"
fi

if [[ ! -x ${binary} ]]; then
  echo "未找到可执行文件：${binary}" >&2
  echo "请先运行 make build，或将二进制路径作为第一个参数传入" >&2
  exit 1
fi

install -Dm0755 "${binary}" /usr/bin/kdae-panel
install -d -m0700 /var/lib/kdae-panel /var/lib/kdae-panel/backups
install -d -m0750 /etc/kdae-panel

if [[ ! -f /etc/kdae-panel/kdae-panel.env ]]; then
  install -Dm0600 "${environment_file}" /etc/kdae-panel/kdae-panel.env
fi

install -Dm0644 "${service_file}" /etc/systemd/system/kdae-panel.service
systemctl daemon-reload
systemctl enable --now kdae-panel.service

echo "kdae-panel 已启动：http://127.0.0.1:2023"
echo "首次访问前请通过 journalctl -u kdae-panel -n 20 --no-pager 查看 bootstrap token。"
