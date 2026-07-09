# Ehtesham's Garden

A React + TypeScript plant storefront built with Vite, Tailwind CSS, and shadcn/ui.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

## Run locally

```sh
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate into the project directory
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install
# or
bun install

# 4. Start the development server
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173` by default (Vite may use a different port if 5173 is busy).

## Environment variables

The app expects backend credentials in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-id
```

These are already injected in the managed environment. When running locally, copy `.env` to `.env.local` and fill in your own values.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite |

## Tech stack

- Vite 5
- React 18
- TypeScript 5
- Tailwind CSS 3
- shadcn/ui
- Framer Motion
- React Router
- TanStack Query
- Supabase client
