# Tailwind CSS 3 reference

This folder is a copyable example of the config-and-directives setup from the original task. It is intentionally separate from the main Tailwind CSS 4 app.

For a Tailwind 3 project, install the version 3 toolchain:

```sh
npm install --save-dev tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Use the `tailwind.config.cjs` content paths and import `input.css` from that project's entry stylesheet. Do not connect this sample to the main app: the main project uses Tailwind 4's Vite plugin.
