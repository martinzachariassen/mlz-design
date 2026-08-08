---
"@martinzachariassen/design": minor
---

Add **`AlertDialog`** — a confirmation before something irreversible.

It runs the same native `<dialog>` engine as `Dialog` and `Sheet`, with three
deliberate differences: `role="alertdialog"` so assistive tech announces it as a
decision and reads the description on open, **no backdrop dismissal** so a stray
click can't answer a question about deleting something, and **no ✕** so the two
ways out are both in the footer. Cancel takes focus, which makes Enter safe on a
dialog nobody has read yet. Esc still cancels — that is the platform's, and
removing it would trap someone who opened the dialog by mistake.

Internally, the `<dialog>` engine that `Dialog` and `Sheet` each carried a
character-for-character copy of is now one implementation
(`overlay/modal-root.tsx`, internal, never exported). Behaviour of both is
unchanged — their tests pass untouched.
