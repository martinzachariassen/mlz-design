---
"@martinzachariassen/design": patch
---

Fill in the Storybook Docs page for every component.

Component JSDoc was attached to the `cva` variants object or the props interface rather than the exported component, so `react-docgen-typescript` never picked it up and each autodocs page rendered with a blank description. The comments now sit directly above the components they describe — which also means editors show them on hover for consumers — and every sub-component (`CardHeader`, `TabsTrigger`, `DialogFooter`, `AvatarFallback`, …) gained one too.

Alongside that: every remaining prop on an exported `*Props` interface is documented, `argTypes` carry descriptions for the CVA-driven props (`variant`, `size`, `tone`) that the docgen prop filter drops, and each story has a line explaining what it demonstrates. The Dialog and Project Card stories previously produced empty docs pages — Dialog now sets an explicit `docs.description.component` and Project Card declares its `component`, so it renders a props table.

No runtime or API change.
