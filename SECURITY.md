# Security Policy

## Supported versions

Only the latest published `@martinzachariassen/design` release receives security
fixes. Pin to a released version and keep it current via Dependabot.

## Reporting a vulnerability

Please report suspected vulnerabilities **privately** through GitHub's
[Report a vulnerability](https://github.com/martinzachariassen/mlz-design/security/advisories/new)
flow (repository **Security → Advisories**). Do not open a public issue for
security reports.

Include a description, affected version, and reproduction steps where possible.
You can expect an acknowledgement within a few days and a coordinated disclosure
once a fix is available.

## What this project already does

- CodeQL, OpenSSF Scorecard, and `zizmor` (Actions static analysis) run in CI, with
  results in the repository Security tab.
- Dependency Review gates pull requests; Dependabot keeps npm, Actions and Docker
  dependencies current.
- Every GitHub Actions workflow pins its actions to a full commit SHA and runs
  under `step-security/harden-runner`.
- Releases are published from a tagged workflow with build provenance (Sigstore
  attestation) and least-privilege tokens.
