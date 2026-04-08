# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Portfolio (`artifacts/portfolio`)
- **Type**: React + Vite (react-vite)
- **Preview Path**: `/`
- **Description**: High-end 3D personal portfolio for Kumail Raza (Flutter Developer)
- **Features**:
  - 3D Hero Section with React Three Fiber (photo on 3D plane, mouse tilt, scroll parallax)
  - Dark/Light mode toggle (localStorage + system preference detection)
  - Animated particles in background
  - GSAP + ScrollTrigger animations throughout
  - Sections: About, Projects (6 cards), Contact form
  - Transparent navbar that goes solid on scroll
  - Graceful WebGL fallback for environments without GPU support
- **Key files**:
  - `src/pages/Home.tsx` — main page layout
  - `src/components/HeroScene.tsx` — Three.js canvas with WebGL detection
  - `src/components/HeroPlane.tsx` — 3D textured plane with mouse/scroll effects
  - `src/components/Particles.tsx` — animated R3F particles
  - `src/components/HeroOverlay.tsx` — GSAP-animated name + CTA overlay
  - `src/components/Navbar.tsx` — transparent/solid navbar with theme toggle
  - `src/components/AboutSection.tsx` — skills + bio with animated progress bars
  - `src/components/ProjectsSection.tsx` — 6 project cards with hover effects
  - `src/components/ContactSection.tsx` — contact form + social links
  - `src/hooks/useTheme.ts` — custom hook for dark/light mode
  - `public/kumail.jpg` — portrait photo (replace to update)
- **Customization**:
  - Replace `public/kumail.jpg` with any new photo to update the 3D texture
  - Edit colors: change `from-violet-600 to-indigo-500` gradients across components
  - Theme toggle uses Tailwind `dark:` classes controlled by `useTheme` hook
