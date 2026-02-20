# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint check
```

No test suite is configured yet.

## Architecture

**Stack:** Next.js (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion

**Domain:** Educational marketplace for live classes ("aulões") — students browse institutions, enroll in classes taught by teachers.

### Data Layer (`/lib/domain.ts`)

All data is mocked in-memory — no HTTP API or database exists yet. This single file (~807 lines) contains:
- All entity types: `ClassEvent`, `Institution`, `Subject`, `TeacherProfile`, `StudentProfile`, `Enrollment`, `Payment`
- All mock data arrays
- Selector functions: `getClassEventById()`, `getPublishedClassEvents()`, etc.
- Business logic: `getStudentAccessState()`, `canStudentEnterClass()`, `isClassSoldOut()`

The `viewer` object (hardcoded in domain.ts) represents the currently logged-in user — there's no real auth yet.

**Key state machine — `StudentAccessState`:**
`"NEEDS_PURCHASE" | "PENDING_PAYMENT" | "WAITING_RELEASE" | "CAN_ENTER"`

**Entity ID prefixes:** `u-` (users), `sp-` (student profiles), `tp-` (teacher profiles), `ce-` (class events)

**`ClassEvent` key fields:**
- `publicationStatus`: `"DRAFT" | "PUBLISHED" | "FINISHED"` — controls visibility
- `meetingStatus`: `"LOCKED" | "RELEASED"` — controls meeting link access

### Routing (`/app`)

| Route | Purpose |
|-------|---------|
| `/` | Home: Hero + institution carousel |
| `/explorar` | Search/filter institutions (client component) |
| `/instituicoes/[institutionId]` | Institution detail with subjects |
| `/instituicoes/[institutionId]/materias/[subjectId]` | Subject detail with teachers & classes |
| `/auloes/[classEventId]` | Class detail — enrollment & access logic |
| `/aluno/meus-auloes` | Student's enrolled classes agenda |
| `/professor/auloes` | Teacher's class management |
| `/login`, `/cadastro` | Auth forms (no real auth yet) |

Pages are Server Components by default; add `"use client"` only for interactivity.

### Components

- **`AppShell`** — root layout wrapper containing `TopNav`
- **`GlassCard`** (`/components/ui/`) — frosted glass card primitive
- **`StatusPill`** — badge with tones: `"default" | "muted" | "warn" | "success"`
- **`AuthLayout` + `AuthDecor3D`** — shared template for login/cadastro pages

### Styling

Tailwind CSS 4 with `@theme` in `globals.css`. Custom utilities defined via `@utility`:
- `.glass` — backdrop blur + transparency
- `.accent-glow` — cyan glow shadow
- `.grid-texture` — industrial background grid

Brand accent color: `#22d3ee` (cyan). Dark theme throughout — deep black backgrounds (`#09090b`).

Fonts: Inter (body) + Space Grotesk (headings).

### Path Alias

`@/*` resolves to the repository root (configured in `tsconfig.json`).

### Naming Conventions

Routes and variables use Portuguese: `auloes` (classes/events), `materias` (subjects), `instituicoes` (institutions), `aluno` (student), `professor` (teacher).

## Tools Available

### Skills
Use the `Skill` tool proactively when the task matches:
- **`frontend-design`** — building or redesigning UI components, pages, and interfaces. Use whenever creating or significantly changing visual components.

### MCP — shadcn
The project has `components.json` configured with the `@shadcn` registry. Before writing custom UI primitives (buttons, badges, cards, inputs, etc.), check if shadcn has a suitable component:
1. `mcp__shadcn__search_items_in_registries` — find components by name/description
2. `mcp__shadcn__view_items_in_registries` — inspect component code
3. `mcp__shadcn__get_add_command_for_items` — get the install command

Currently installed shadcn components: only `GlassCard` (custom, not from shadcn). Everything else is hand-rolled — always check shadcn first before writing new primitives.
