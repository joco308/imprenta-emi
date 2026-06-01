# AGENTS.md

## Stack
- **Next.js 15.5.18** (App Router, `src/` directory) + **React 19** + **TypeScript 5.9** SPA.
- Tailwind CSS v4 via `@tailwindcss/postcss` (PostCSS plugin, no Vite).
- shadcn/ui primitives in `src/components/ui/` (MIT, see `ATTRIBUTIONS.md`).
- Other libs in use: `sonner` (toasts), `lucide-react` (icons), `recharts` (admin charts), Radix UI, `class-variance-authority`, `tailwind-merge`, `clsx`, `motion`, `date-fns`, `react-hook-form`.

## Commands
- Package manager: **npm** (no longer pnpm). The `pnpm.overrides` block was removed.
- `npm install` (package name is `@figma/my-make-file`).
- `npm run dev` — Next.js dev server (default port 3000, uses Turbopack).
- `npm run build` — `next build` to `.next/`.
- `npm run start` — serve the production build.
- `npm run lint` — `next lint` (requires `eslint` + `eslint-config-next`, both installed).
- No `test`, `typecheck`, or `format` scripts are defined; do not invent them without asking.

## Environment (WSL ↔ Windows)
- The editor/agent runs in **WSL** (Linux), but the project lives on the **Windows** filesystem and is executed by **Node.js on the Windows side**.
- This WSL shell **does NOT have `node`, `npm`, `npx`, or `pnpm` installed**. Do not try to run them from here — they will fail with "command not found".
- The user runs all Node/npm commands manually from a Windows terminal (PowerShell / cmd / Windows Terminal). When suggesting or preparing changes, write/edit files only; tell the user which command to run themselves.
- File paths: the repo is mounted under `/mnt/c/...` in WSL. Editing files here is fine (Windows sees them live); just don't try to `npm install` / `npm run dev` from this shell.
- **Node version**: Next.js 15 requires Node >= 18.18. Windows-side should be Node 20 LTS or 22 LTS (Node 18 dropped in Next.js 16).

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
- Styles: `src/app/globals.css` aggregates `../styles/{fonts,tailwind,theme}.css`. All Tailwind tokens / dark mode are defined in `theme.css` using `@custom-variant dark` and `@theme inline`.

## Path alias
- `@/*` -> `./src/*` (set in `tsconfig.json` `paths`). Use it for cross-folder imports; shadcn `ui/*` components import siblings via relative paths and `./utils`.

## Next.js / React 19 quirks
- App Router pages are **Server Components by default**. Every page in this project uses `'use client'` at the top because they all rely on `useState`, `useEffect`, `localStorage`, event handlers, etc. Don't strip that directive.
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

## Tailwind v4 notes (`src/styles/tailwind.css`)
- Uses `@import 'tailwindcss' source(none);` plus an explicit `@source '../**/*.{js,ts,jsx,tsx}';` — content scanning is manual. If you add new file types or locations, extend the `@source` glob or classes won't be generated.
- `tw-animate-css` is imported here.
- Tokens / dark mode are in `src/styles/theme.css` (`@custom-variant dark`, `@theme inline`). All shadcn components rely on these CSS variables.

## Conventions
- Language: Spanish in all user-facing copy and `mockData.ts` (e.g. `formatDate` uses `es-ES`).
- Auth is **mocked**: `Login.tsx` accepts any email/password and stores the chosen role (Estudiante / Docente / Administrador) in `localStorage`. There is no real backend; state is in-memory.
- Toast notifications go through `sonner` via `ToasterWrapper` (mounted in the root layout).
- shadcn components in `src/components/ui/` are upstream Figma Make output — prefer composing/extending at the call site over editing them. New UI primitives follow the same shadcn patterns (`cn` from `./utils`, `cva` variants, `data-slot` attributes).
- `src/components/figma/ImageWithFallback.tsx` is a Figma-Make-specific image with built-in error fallback SVG. Client component (uses `useState`).
- Every page component must be a **default export**. Next.js requires `page.tsx` to default-export a React component.

## Adding things
- New route: create `src/app/<route>/page.tsx` (default export, `'use client'` if it uses state/effects/browser APIs). Add a link from another page with `import Link from 'next/link'` + `<Link href="/<route>">`.
- New shadcn primitive: mirror the structure in `src/components/ui/`; share `cn` from `src/components/ui/utils.ts`.
- New mock data / helper: extend `src/lib/mockData.ts` rather than scattering constants.
- Static asset for `figma:asset/...` imports: drop the file under `src/assets/` with the exact filename used in the import.

## What is NOT here
- No tests, no test runner, no CI workflows, no pre-commit hooks, no Prettier config.
- No lockfile or `node_modules` in the repo — first run is `npm install`.
- No `index.html` and no Vite entry (`src/main.tsx` is gone) — Next.js generates the HTML.
- No MUI, no Emotion, no `react-dnd`, no `react-slick` (removed during the Next.js migration; they were declared but never imported).
