# 森森不息 (EverForest) — Camping Activity Booking Platform

## Project Overview
A Next.js 15 full-stack platform for discovering and booking outdoor/camping activities. Users can browse events, hosts can create and manage activities, and admins oversee the platform.

**Backend API:** `https://everforest-backend.zeabur.app/api/v1`
**Swagger:** `https://everforest-backend.zeabur.app/swagger.json`

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **State:** Zustand 5 (client state), SWR 2 (server data)
- **Forms:** React Hook Form 7 + Zod 3 (validation)
- **API Types:** Orval 7 (codegen from Swagger)
- **HTTP:** Axios with credentials

## Dev Commands
```bash
npm run dev     # Start dev server (port 3000)
npm run build   # Production build
npm run lint    # ESLint check
```

## Directory Structure
```
app/            # Next.js App Router pages & API routes
api/            # Axios instance & server-side fetch helpers
components/     # Reusable UI components (50+)
sections/       # Landing page sections
stores/         # Zustand stores (login, cart, filters, UI)
swr/            # SWR data-fetching hooks by domain
types/          # TypeScript types (Orval codegen + custom)
schema/         # Zod validation schemas
hook/           # Custom React hooks
utils/          # Helper functions (dates, ECPay, errors)
styles/         # Global CSS & animation modules
fakeData/       # Mock data for development
```

## Key Conventions

### API & Data Fetching
- Generated API types live in `types/services/` — regenerate with `npx orval`
- SWR hooks in `swr/` are organized by domain (auth, events, member, host, admin, meta)
- Server-side fetching uses helpers in `api/` (not SWR)
- Axios instance is in `api/` with credentials support

### Authentication
- Token-based: `access_token` + `refresh_token` via cookies
- `middleware.ts` handles token refresh and route protection automatically
- Protected routes: `/member/*`, `/host/*`, `/create-activity/*`, `/edit-event/*`, `/cart/*`, `/admin/activity`, `/orders/payment-success/*`

### State Management
- `stores/loginStore` — user session
- `stores/shoppingCartStore` — cart state
- `stores/filterStore` — search/filter state
- Keep server data in SWR, keep UI/session state in Zustand

### Styling
- Use Tailwind utility classes + DaisyUI component classes
- Custom CSS modules in `styles/` for animations, forms, typography
- Responsive-first design

### Path Alias
- `@/*` resolves to project root (e.g., `@/components/...`)

## Environment Variables
```
NEXT_PUBLIC_API_BASE=https://everforest-backend.zeabur.app/api/v1
```

## Allowed External Image Domains
- `img.daisyui.com`
- `storage.googleapis.com`
- `i.pravatar.cc`
