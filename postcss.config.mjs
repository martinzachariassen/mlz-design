// Tailwind v4 via PostCSS — Storybook's Vite builder consumes this automatically.
// (The @tailwindcss/vite plugin has open export-compat issues with Storybook's
// builder, so the PostCSS path is the resilient choice.) tsup doesn't process
// CSS, so this only affects the Storybook build.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
