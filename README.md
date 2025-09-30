# Kelveneers Astro Starter

Strict TypeScript Astro starter bundled with Tailwind CSS and MDX support, scaffolded via `pnpm create astro@latest`.

## Tech Stack

- [Astro](https://astro.build/) with strict TypeScript configuration
- [Tailwind CSS](https://tailwindcss.com/) (via the official Vite plugin)
- [MDX](https://mdxjs.com/) for mixed Markdown + JSX authoring

## Project Structure

- `src/pages` – Astro pages and Markdown content
- `src/components` – Reusable UI components
- `public/` – Static assets copied to the final build as-is
- `astro.config.mjs` – Astro + Vite configuration with Tailwind plugin enabled
- `tsconfig.json` – Strict TypeScript settings inherited from Astro presets

## Getting Started

```sh
pnpm install
pnpm dev
```

The dev server runs on <http://localhost:4321> by default.

## Build and Preview

```sh
pnpm build
pnpm preview
```

The static site output is generated in `dist/`.

## Useful Commands

- `pnpm astro add` – Add integrations (React, Vue, Tailwind updates, etc.)
- `pnpm astro check` – Run Astro's type and content checks
- `pnpm astro sync` – Sync content collection types when updating content schemas

Refer to the [Astro documentation](https://docs.astro.build/) for deeper customization options.
