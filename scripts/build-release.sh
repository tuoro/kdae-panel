#!/usr/bin/env bash
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
version=${1:-dev}
dist_dir="${repo_root}/dist"

rm -rf "${dist_dir}"
mkdir -p "${dist_dir}"

targets=(
  "amd64"
  "arm64"
  "riscv64"
)

for arch in "${targets[@]}"; do
  package="kdae-panel_${version}_linux_${arch}"
  stage="${dist_dir}/${package}"
  mkdir -p "${stage}"

  CGO_ENABLED=0 GOOS=linux GOARCH="${arch}" go -C "${repo_root}" build \
    -trimpath \
    -ldflags "-s -w -X main.version=${version}" \
    -o "${stage}/kdae-panel" \
    ./cmd/kdae-panel

  install -m0644 "${repo_root}/packaging/kdae-panel.service" "${stage}/kdae-panel.service"
  install -m0600 "${repo_root}/packaging/kdae-panel.env" "${stage}/kdae-panel.env"
  install -m0755 "${repo_root}/scripts/install.sh" "${stage}/install.sh"
  install -m0755 "${repo_root}/scripts/uninstall.sh" "${stage}/uninstall.sh"
  install -m0644 "${repo_root}/LICENSE" "${stage}/LICENSE"
  install -m0644 "${repo_root}/README.md" "${stage}/README.md"

  tar -C "${dist_dir}" -czf "${dist_dir}/${package}.tar.gz" "${package}"
  rm -rf "${stage}"
done

(
  cd "${dist_dir}"
  sha256sum ./*.tar.gz > SHA256SUMS
)
