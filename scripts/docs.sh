#!/usr/bin/env bash
set -euo pipefail
markdownlint-cli2
output="$(mktemp -d)"
trap 'rm -rf "$output"' EXIT
for file in README.md docs/*.md; do
  if grep -q '^```mermaid' "$file"; then
    mmdc -i "$file" -o "$output/$(basename "$file")" -p scripts/puppeteer.json
  fi
done
