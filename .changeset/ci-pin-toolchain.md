---
"@martinzachariassen/design": patch
---

Pin `playwright` to the version `@storybook/test-runner` drives (1.61.1) so the
a11y gate installs a browser from the lockfile rather than whatever the registry
serves that day.

No runtime change — the rest of this bump is workflow hardening (pinned Bun,
bounded job runtimes, concurrency groups) and repository templates.
