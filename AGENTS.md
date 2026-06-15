# AGENTS.md

## Stack
- **Next.js 15.5.18** (App Router, `src/` directory) + **React 19** + **TypeScript 5.9** SPA.
- Tailwind CSS v4 via `@tailwindcss/postcss` (PostCSS plugin, no Vite).
- shadcn/ui primitives in `src/components/ui/` (MIT, see `ATTRIBUTIONS.md`).
- Other libs in use: `sonner` (toasts), `lucide-react` (icons), `recharts` (admin charts), Radix UI, `class-variance-authority`, `tailwind-merge`, `clsx`, `motion`, `date-fns`, `react-hook-form`, `@supabase/supabase-js`, `@supabase/ssr`, `shadcn` (CLI).

## Commands
- Package manager: **npm** (no longer pnpm). The `pnpm.overrides` block was removed.
- `npm install` (package name is `@figma/my-make-file`).
- `npm run dev` — Next.js dev server (default port 3000, uses Turbopack).
- `npm run build` — `next build` to `.next/`.
- `npm run start` — serve the production build.
- `npm run lint` — `next lint` (requires `eslint` + `eslint-config-next`, both installed).
- No `test`, `typecheck`, or `format` scripts are defined; do not invent them without asking.

## ⚠️ WSL constraint — agent CANNOT run Node.js
- This agent runs in a **separate WSL environment** that **does NOT have `node`, `npm`, `npx`, or `pnpm`**.
- **Never try to execute** `npm`, `node`, `npx`, `next`, or any Node.js/Next.js command — they will fail.
- The user runs all commands manually from a **Windows terminal** (PowerShell / cmd / Windows Terminal). When suggesting changes, **edit files only** and tell the user which commands to run.
- **Node version**: Windows-side should be Node 20 LTS or 22 LTS (Next.js 15 requires >= 18.18).
- File paths: repo is mounted under `/mnt/c/...` in WSL. Editing files here is fine (Windows sees changes live).

## Entry points & layout
- `src/app/layout.tsx` — root layout (HTML/body, mounts `<ToasterWrapper>` + `<SupportChat>` globally).
- `src/app/page.tsx` — `/` Home (landing page).
- App Router routes (each is a folder with `page.tsx`):
  - `src/app/login/page.tsx` — `/login`
  - `src/app/client/page.tsx` — `/client`
  - `src/app/admin/page.tsx` — `/admin`
  - `src/app/supplies/page.tsx` — `/supplies`
  - `src/app/not-found.tsx` — 404
- Components: `src/components/{ui,figma,SupportChat,ToasterWrapper}.tsx` (shadcn in `ui/`).
- Mock data + helpers: `src/lib/mockData.ts` (users, orders, products, statuses, services, `generateQRCode`, `calculateEstimatedTime`, `formatDate`).
- Styles: `src/app/globals.css` aggregates `../styles/{fonts,tailwind,theme}.css`. Tailwind tokens and dark mode are now defined in `tailwind.css` itself (imports `shadcn/tailwind.css`, defines `@theme inline` and `@custom-variant dark`). The old `theme.css` still exists but its tokens may be shadowed.
- Supabase lib: `src/lib/{client,server,middleware,utils}.ts`. Client uses `createBrowserClient` (`@supabase/ssr`); server uses `createServerClient` + `cookies()` from `next/headers`; middleware helper uses `createServerClient` + `getClaims()`.

## Path alias
- `@/*` -> `./src/*` (set in `tsconfig.json` `paths`). Use it for cross-folder imports; shadcn `ui/*` components import siblings via relative paths and `./utils`.
- `components.json` now adds aliases: `components`→`@/components`, `utils`→`@/lib/utils`, `ui`→`@/components/ui`, `lib`→`@/lib`, `hooks`→`@/hooks`.
- **Note**: there are now two `cn()` utilities — `src/lib/utils.ts` (referenced by `components.json`) and `src/components/ui/utils.ts` (legacy). Both do the same thing (`clsx` + `tailwind-merge`). Prefer `@/lib/utils` going forward.

## Next.js / React 19 quirks
- App Router pages are **Server Components by default**. Every page in this project uses `'use client'` at the top because they all rely on `useState`, `useEffect`, `localStorage`, event handlers, etc. Don't strip that directive.
- The root layout now imports `Geist` from `next/font/google` and applies `font-sans` via `cn()` on `<html>`. If you add other fonts, follow the same pattern.
- `localStorage` and `window` are only available on the client. The existing `ClientDashboard` / `AdminDashboard` guard with `typeof window !== 'undefined'` — keep that pattern.
- **Navigation**: `next/link` for declarative (`<Link href="/x">`), `useRouter()` from `next/navigation` for programmatic (`router.push('/x')`). Do **not** use `react-router` (it is not installed).
- **`<Toaster />`** from sonner must live in a client component. It is wrapped in `src/components/ToasterWrapper.tsx`; the root layout imports that wrapper, not sonner directly.
- **`<SupportChat />`** is a client component (`'use client'` at top of file).
- **Recharts** in the admin page is a client-only library. The `AdminDashboard` page is already marked `'use client'`, so the chart works.
- **Images**: the existing pages still use raw `<img>` tags (Unsplash URLs). If you switch to `next/image`, you must add the `unsplash.com` host to `images.remotePatterns` in `next.config.mjs`.
- **`recharts` + React 19** requires the `react-is` override in `package.json` (`"overrides": { "react-is": "19.0.0" }`) — leave it in place, recharts 2.x still uses `react-is` internally.
- **`react-day-picker@8.10.2`** works with React 19 (peer-dep expanded in the 8.10.2 release).

## Config files
- `next.config.mjs` — contains a custom webpack `FigmaAssetResolver` plugin that rewrites `figma:asset/<filename>` imports to `src/assets/<filename>` (replaces the Vite plugin from the old setup). It only runs on the webpack path; if you switch to Turbopack-only via `--turbo`, this resolver is bypassed.
- `postcss.config.mjs` — uses `@tailwindcss/postcss`. Don't replace it with `@tailwindcss/vite` (that's Vite-only).
- `tsconfig.json` — `moduleResolution: "bundler"`, `jsx: "preserve"`, `strict: true`, path alias `@/*`. Next.js auto-generates types in `.next/types/`.
- `next-env.d.ts` — reference file, do not edit (Next.js convention).
- `components.json` — shadcn/ui config (`"style": "radix-nova"`, `"rsc": true`, `"iconLibrary": "lucide"`). Registers `@supabase` registry: `"https://supabase.com/ui/r/{name}.json"`.

## Tailwind v4 notes (`src/styles/tailwind.css`)
- Uses `@import 'tailwindcss' source(none);` plus an explicit `@source '../**/*.{js,ts,jsx,tsx}';` — content scanning is manual. If you add new file types or locations, extend the `@source` glob or classes won't be generated.
- Imports `shadcn/tailwind.css` for shadcn v4 styles and `tw-animate-css` for animations.
- Defines its own `@theme inline` block with all CSS variables (colors, radius, sidebar). Also has its own `@custom-variant dark` and `:root`/`.dark` blocks in the same file.
- The old `src/styles/theme.css` still exists but its tokens may be shadowed by the ones in `tailwind.css`.

## Conventions
- Language: Spanish in all user-facing copy and `mockData.ts` (e.g. `formatDate` uses `es-ES`).
- Auth was **mocked** (login page accepts any email/password, stores role in `localStorage`). Supabase client files are now set up (`src/lib/client.ts`, `server.ts`, `middleware.ts`) but **not yet wired** into pages — `.env.local` still empty, no real authentication connected.
- **Supabase env vars required**: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` must be set in `.env.local` for Supabase clients to work.
- Toast notifications go through `sonner` via `ToasterWrapper` (mounted in the root layout).
- shadcn components in `src/components/ui/` are upstream Figma Make output — prefer composing/extending at the call site over editing them. New UI primitives follow the same shadcn patterns (`cn` from `./utils`, `cva` variants, `data-slot` attributes).
- `src/components/figma/ImageWithFallback.tsx` is a Figma-Make-specific image with built-in error fallback SVG. Client component (uses `useState`).
- `src/lib/utils.ts` provides `cn()` (clsx + tailwind-merge), the canonical utility for class merging. There's a duplicate in `src/components/ui/utils.ts` — prefer `@/lib/utils` for new code.
- Every page component must be a **default export**. Next.js requires `page.tsx` to default-export a React component.
- `src/app/not-found.tsx` is a **Server Component** (no `'use client'`) — the only page without it. All other pages use `'use client'`.

## Adding things
- New route: create `src/app/<route>/page.tsx` (default export, `'use client'` if it uses state/effects/browser APIs). Add a link from another page with `import Link from 'next/link'` + `<Link href="/<route>">`.
- New shadcn primitive: mirror the structure in `src/components/ui/`; share `cn` from `src/components/ui/utils.ts`.
- New mock data / helper: extend `src/lib/mockData.ts` rather than scattering constants.
- Static asset for `figma:asset/...` imports: drop the file under `src/assets/` with the exact filename used in the import.

## What is NOT here
- No tests, no test runner, no CI workflows, no pre-commit hooks, no Prettier config.
- No `index.html` and no Vite entry (`src/main.tsx` is gone) — Next.js generates the HTML.
- No MUI, no Emotion, no `react-dnd`, no `react-slick` (removed during the Next.js migration; they were declared but never imported).
- `DDL.sql` at root defines the intended PostgreSQL schema (Dominio, Usuarios, Impresion, Orden, etc.) but no backend or DB connection is wired yet.
- `src/assets/` directory does not exist yet. If you use `figma:asset/...` imports, create the target file there first.
