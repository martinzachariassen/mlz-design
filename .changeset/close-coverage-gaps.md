---
"@martinzachariassen/design": patch
---

Tests only — no behaviour change. Every component in the library now has
coverage.

The gaps closed were `Container`/`Stack`/`Grid` (three exported primitives with
zero tests), `Textarea`, `Label`, `Kbd`, `Prose`, `Skeleton`, `Spinner`, and the
`brand/` components. The ones worth having: `Grid`'s auto-fitting track
expression including the `min(100%, …)` cap that stops a wide track overflowing
a phone, `FloatingMarks` rendering identically across mounts (it hashes each
mark's index rather than calling `Math.random`, which is what keeps it
SSR-safe), and the locked aspect ratios of `RepoBanner` and `SocialCard`, which
are export templates where the ratio is the contract.
