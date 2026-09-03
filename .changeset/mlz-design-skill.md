---
"@martinzachariassen/design": minor
---

Ship an agent skill with the package. `skills/mlz-design/` gives consuming apps
the token reference, component inventory, colour ladder and focus contracts
without being pointed at this repo by hand. The references are generated from
`src/` by `scripts/generate-skill-inventory.mjs` and gated in CI, so they cannot
drift from what the package actually exports.
