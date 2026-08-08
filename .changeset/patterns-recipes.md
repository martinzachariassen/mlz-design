---
"@martinzachariassen/design": patch
---

Storybook only — no package change. The single `Patterns/Overview` story is now
four named recipes: **Application shell**, **Dashboard**, **Forms**, and
**Feedback and states**, thirteen stories between them.

Each one is individually linkable, and the odd `Patterns → Overview → Overview`
nesting is gone. The recipes now use the components that were extracted from
them — `Stat`, `EmptyState`, `Field`, `Command`, `Collapsible`, `AlertDialog` —
rather than hand-rolling the same shapes inline.
