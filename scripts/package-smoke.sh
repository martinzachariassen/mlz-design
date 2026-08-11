#!/usr/bin/env bash
# Package smoke test: pack the tarball, install it in a scratch app, and prove
# that every JS entry point actually resolves and imports — from both ESM and
# CJS — the way a consumer's tooling will do it. This is the gate publint/attw
# can't provide: they lint metadata, this executes the package.
#
# Run from the repo root, after `bun run build`. CI runs it in `verify`.
set -euo pipefail

root="$(pwd)"

# The RSC contract: client entries must lead with the directive, tokens must not.
head -c 30 dist/index.js | grep -q '"use client"' ||
  { echo '::error::dist/index.js is missing the "use client" banner'; exit 1; }
head -c 30 dist/toaster.js | grep -q '"use client"' ||
  { echo '::error::dist/toaster.js is missing the "use client" banner'; exit 1; }
if head -c 30 dist/tokens.js | grep -q '"use client"'; then
  echo '::error::dist/tokens.js must stay directive-free (server-component safe)'
  exit 1
fi

tarball="$root/$(npm pack --silent)"
trap 'rm -f "$tarball"' EXIT

dir="$(mktemp -d)"
cd "$dir"
npm init -y >/dev/null
# npm installs the tarball's dependencies and (npm ≥7) its peers, so the import
# probes below exercise the real dependency graph, not a hoisted dev tree.
npm install --no-audit --no-fund --silent "$tarball"

node --input-type=module -e "
  const m = await import('@martinzachariassen/design');
  if (!m.Button || !m.ThemeProvider) throw new Error('root entry missing exports');
  const t = await import('@martinzachariassen/design/tokens');
  if (!t.accents) throw new Error('tokens entry missing exports');
  const s = await import('@martinzachariassen/design/toaster');
  if (!s.toast) throw new Error('toaster entry missing exports');
"
node -e "
  const m = require('@martinzachariassen/design');
  if (!m.Button) throw new Error('root entry not requireable');
  const t = require('@martinzachariassen/design/tokens');
  if (!t.accents) throw new Error('tokens entry not requireable');
"
node -e "
  const fs = require('node:fs');
  for (const f of [
    'styles/index.css', 'styles/theme.css', 'styles/base.css',
    'styles/fonts.css', 'styles/fonts-self-hosted.css', 'styles/index-self-hosted.css',
  ]) {
    fs.accessSync(require.resolve('@martinzachariassen/design/' + f));
  }
"
cd "$root"
rm -rf "$dir"
echo "package smoke test: OK"
