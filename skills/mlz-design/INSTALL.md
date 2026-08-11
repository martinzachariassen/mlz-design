# Wiring this skill into the other repos

The skill lives in `mlz-design` because that is where it can be kept true. The
consuming repos need a copy that cannot drift from the version they actually
have installed.

## 1. Ship it with the package (recommended)

Already done in this patch: `files` is now `["dist", "skills"]`.

The skill is committed at `skills/mlz-design/`, not `.claude/skills/`, because
this repo gitignores `.claude/` as local agent state — and a path npm may treat
as a dotfile is a bad thing to hang a published artifact on. `mise run
agent-link` symlinks it into `.claude/` for your own clone.

In every consuming repo (mlz.no, url-shortener frontend, ip-speil):

```bash
mkdir -p .claude/skills
ln -s ../../node_modules/@martinzachariassen/design/skills/mlz-design \
      .claude/skills/mlz-design
```

Claude Code follows symlinks out of the skill directories and reads `SKILL.md`
from the target, and loads a skill once even when the same target is reachable
from several places.

Why this shape and not a copy: the skill now version-matches the installed
package. Bump from `~0.8.0` to `~0.9.0` and the component inventory moves with
it. A skill that describes components the app does not have is worse than no
skill, because it is confidently wrong.

Commit the symlink; add nothing to `.gitignore`.

## 2. Or, personal skill across every project

Cruder, but no publish step, and it covers repos that do not install the package:

```bash
ln -s ~/Developer/personal/mlz-design/skills/mlz-design ~/.claude/skills/mlz-design
```

This always tracks your working copy of mlz-design, including uncommitted
changes — fine while iterating, misleading once an app pins an older version.

## 3. Keep the references honest

Already wired: `skill:inventory` / `skill:check` in `package.json`, a
`skill:check` step in `ci.yml` between `test` and `build`, `skill-check` in
`mise run check`, and `skill:check` in the `release` chain. It fails when a component is added or removed without regenerating the
inventory — the same enforcement pattern as the tokens mirror, for the same
reason: a reference that can drift silently will.

`references/*.md` are generated. Do not hand-edit them; edit the generator or
the JSDoc it reads. Component blurbs come from each component's own JSDoc, so
`Breadcrumb`, `Skeleton` and `ModalRoot` currently appear bare — they have no
doc comment on the declaration. Worth fixing at the source.

## 4. The subagent

`agents/design-review.md` is not distributed by the symlink above.
Either copy it into each repo's `.claude/agents/`, or add a
`.claude-plugin/plugin.json` to the skill folder — a skill folder with one loads
as a plugin and can then bundle agents, hooks and MCP servers alongside the skill.

## 5. Order of precedence, when you hit a surprise

Enterprise skills override personal, which override project. So a personal
symlink from option 2 will win over a project symlink from option 1 in a repo
that has both. Pick one.
