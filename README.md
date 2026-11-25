# Mee-Eain

A student opportunity platform built with Next.js App Router, TypeScript, Tailwind CSS 4, Neon Managed Auth, Neon Postgres, and Drizzle ORM.

## Setup

Use Node.js 20.9 or newer. Create an AWS-region Neon project, enable Managed Auth on its branch, then copy the pooled Postgres URL, direct Postgres URL, and Auth base URL from the Neon Console.

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL, DATABASE_URL_UNPOOLED, NEON_AUTH_BASE_URL, and NEON_AUTH_COOKIE_SECRET
npx drizzle-kit push
npm run db:seed
npm run dev
```

In PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`. Open http://localhost:3000. Drizzle uses the direct connection for schema changes and falls back to `DATABASE_URL` if no direct URL is set. For ongoing environments, use `npm run db:generate` then `npm run db:migrate`.

Neon Managed Auth is available in AWS regions and cannot be enabled on a project using IP Allow or Private Networking. Add `http://localhost:3000` as a trusted domain in Neon Auth before signing in.

## Demo accounts

The seed script provisions these development-only accounts in Neon Auth and creates their matching app profiles. Override the passwords in `.env.local` before running the seed. Do not use these defaults in production.

- Student: `maya.student@nexuslearn.demo` / `StudentDemo2026!`
- Admin: `aung.admin@nexuslearn.demo` / `AdminDemo2026!`

Neon Auth email verification settings apply to demo accounts. If the branch requires verification, complete verification using the configured email delivery before signing in.

For admin invitations during local development, set a private `DEMO_ADMIN_BOOTSTRAP_CODE` in `.env.local`; sign-up checks it server-side before assigning the admin role. Do not use a shared or example code in production.

## Features

- Searchable, filterable home listings and pinned announcements with saved/applied actions.
- Neon Auth email/password registration and login. Student is the default role; admin promotion requires a server-checked invite code.
- Profile page with university/major editing, Neon Auth ID, 14-day check-in calendar, streak count, and saved/applied tabs.
- Admin dashboard with user/listing/application KPIs, listing publishing/deletion, and student directory.
- Server-side session and role checks for profile mutations and admin operations.
- Sample homepage preview data when the database is not configured; live data and write features require Neon environment values.

## Database and environment

The Drizzle schema is in `src/db/schema.ts`; data access lives in `src/db/index.ts` and `src/lib/data.ts`. See `.env.example`. Keep credentials in `.env.local` and Vercel project environment variables. Set your production origin as a Neon Auth trusted domain. Production verification links need custom SMTP.
