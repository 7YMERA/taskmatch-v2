# Agent corner

The shared handoff log for the two AI assistants on this repo: **Claude** (Claude Code, cloud and
personal laptop) and **Kiro** (KiroCrew, work laptop). **Read this first** in a new
chat instead of re-reading the whole repo, then open only the files your task needs.
**Update it last**, in the same pull request as your change (see "How to update" at the bottom).

Keep it under ~200 lines so it stays cheap to read. Public repo: no passwords, keys, tokens or demo
logins here.

## Current state (2026-11-08)

- Live: https://taskmatch-umber.vercel.app (site at `/`, API at `/api`, one Vercel project, deploys from `main` only).
- `main` has everything up to PR #37: portfolio-inspired look (amber second accent, tinted neutrals,
  Bricolage display font, numbers strips, cursor glow, v1/v2 slider, phone dock) and #36 `.mcp.json`
  (shadcn, magicui, playwright, context7 MCP servers for Claude Code).
- Open PRs: **#38** (this agent corner).
- Shelved: the Claude AI assist feature (`taskmatch-api/ai.py`, `AISuggest.tsx`). Don't build on it.

## Handoff (next agent starts here)

What the last agent left half-done or queued. Replace it, don't append to it.

- Nothing in progress. Suggested from #37: refresh `public/compare/*-v2.webp` with new shots; use
  `--tm-warm` for due-soon markers in the app.

## Owner to-dos (not code)

- Rotate the demo admin password now that #35 is live (keep it only in the laptop's gitignored env).
- Suspend the old Render API (fallback only), then delete `taskmatch/vercel.json`.

## Map

| Path | What |
|---|---|
| `taskmatch/` | Next.js 16 + React 19 + TS + Tailwind v4. **Next 16 differs from training data**: read `taskmatch/AGENTS.md` first. |
| `taskmatch/app/<page>/` | One folder per route: dashboard, tasks, people (was students), match, my-tasks, projects, team, audit, approvals, integrations, settings, onboarding, demo, join, login, signup, logs, profile. |
| `taskmatch/app/components/ui.tsx` | Design system primitives + outline `Icon` set. Use these; no emoji in UI. |
| `taskmatch/app/globals.css` | `tm-*` colour tokens; light theme via `<html data-theme="light">`. |
| `taskmatch/app/components/CursorGlow.tsx`, `BeforeAfter.tsx` | Card cursor glow; landing v1/v2 slider (images in `public/compare/`). |
| `.mcp.json` | MCP servers for Claude Code sessions (shadcn, magicui, playwright, context7). |
| `taskmatch/app/lib/supabase.ts` | Shared Supabase client, `API` base URL, `authHeaders()`. |
| `taskmatch/app/lib/permissions.json` | Role permissions (frontend copy). |
| `taskmatch-api/main.py` | FastAPI app, all endpoints (~2.5k lines). `ROLE_PERMISSIONS`, `WORKSPACE_TABLES`. |
| `taskmatch-api/matching.py` | Fit score out of 100: skills 45, proven 20, availability 20, record 15. |
| `taskmatch-api/test_*.py` | pytest suite; CI runs it with dummy env, never a real DB. |
| `supabase/*.sql` | Run once, in the order listed in README "The database". `tm_can()` is defined in `roles.sql` and updated in `workspaces.sql`. |
| `vercel.json` (root) | Vercel Services (web + api) and the "only `main` deploys" switch. |
| `AGENTS.md` | Working rules. This file is the state; AGENTS.md is the rules. |

## Checks before pushing

```bash
cd taskmatch-api && python -m pytest -q          # backend
cd taskmatch && npx tsc --noEmit && npm run lint  # frontend
```

## Decisions (don't re-litigate)

- One Vercel project for site + API (user rejected a second project). `NEXT_PUBLIC_API_URL=/api`.
- Roles: admin, lead, member, viewer. Enforced in three places that must agree:
  `permissions.json`, API `ROLE_PERMISSIONS`, SQL `tm_can()`.
- Try the demo signs in a shared visitor as **team lead** server-side (`POST /demo/start`). Never admin.
- `/students` routes moved to `/people` (redirects in `next.config.ts`); DB table and API still say `students`.
- Before/after comparisons always use **v1** (the FYP, `7YMERA/taskmatch-git`, v2 commit `7fb3bc1`) as "before".
- Design direction: tinted neutral base, indigo brand accent + amber `--tm-warm` second accent, both themes must work.
- Docs live on the Wiki, not in a `docs/` folder.

## Gotchas

- Branch from the latest `main` every time; old branches lack `vercel.json`, so Vercel builds a failing preview and emails the owner.
- Cloud sessions can't push to the Wiki repo. Clone it, commit, and leave a `git bundle` in the project files for the owner.
- GitHub MCP tools want the repo name `taskmatch-2.0`; the git/gh proxy wants `taskmatch-v2`.
- Supabase and `vercel.app` are blocked from the cloud sandbox. Screenshots use a mock build
  (`NEXT_PUBLIC_SUPABASE_URL=https://mock.supabase.co`, Playwright route mocks, fake session in `sb-mock-auth-token`).
- `.tm-card` has backdrop-filter + hover transform, which traps `fixed` overlays inside it; disable both while a menu is open.
- `maybeSingle()` mocks need an array of exactly one row.

## Who does what

| | Claude | Kiro |
|---|---|---|
| Runs on | Cloud sessions and the personal laptop | KiroCrew on the work laptop |
| Reads rules from | `CLAUDE.md` (includes `AGENTS.md`) | `.kiro/steering/repo-rules.md` (points to `AGENTS.md`) |
| Extra tools | `.mcp.json` servers | Own `.kiro/settings`; doesn't get `.mcp.json` |
| Commit as | `7YMERA` no-reply address, set per repo | Same, set per repo only (never globally on the work laptop) |

If you pick up work the other agent started, read its last log line and the Handoff section, then
its branch's commits, before changing anything.

## Log (newest first, one line each)

| Date | PR | Who | What |
|---|---|---|---|
| 2026-11-08 | #38 | Claude | Added this agent corner; AGENTS.md and Kiro's steering say read it first and update it last. |
| 2026-11-07 | #37 | Claude | Portfolio-inspired restyle. |
| 2026-10-29 | #36 | Claude | Root `.mcp.json` for Claude Code sessions. |
| 2026-10-27 | #35 | Claude | Try the demo with no login. |
| 2026-10-27 | #34 | Claude | AGENTS.md rules; root `vercel.json` stops branch previews. |
| 2026-10-27 | #33 | Claude | Students to People; Find a match page at `/match`. |
| 2026-10-27 | #31, #32 | Claude | API moved from Render into the Vercel project under `/api`. |
| 2026-10-27 | #30 | Claude | `docs/` moved to the Wiki. |
| 2026-10-27 | #29 | Claude | New "Overlap" logo. |
| 2026-10-26 | #27, #28 | Claude | Level 3 (GitHub/Jira import, matcher auto-tune), approval fixes, bell/Ctrl+K polish. |
| 2026-10-26 | #19-#24 | Kiro | Notifications/approvals, Ctrl+K, settings, CSV export, onboarding. |
| 2026-10-25 | #1-#18 | Claude | Security hardening, RLS, redesign, phases 1-3b, people matching. |

## How to update

At the end of each pull request, in the same branch:

1. Add one line at the top of **Log** (date, PR, who, what).
2. Rewrite **Handoff** with anything you left unfinished, or "Nothing in progress".
3. Fix anything in **Current state**, **Owner to-dos**, **Map**, **Decisions** or **Gotchas** that your change made wrong.
4. Delete lines that are no longer true rather than adding "update:" notes. Fold old log rows together once the table passes ~20 rows.
