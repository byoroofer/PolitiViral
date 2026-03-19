# PolitiViral

PolitiViral is a premium political creator activation platform for campaigns, PACs, advocacy groups, and creators.

Milestone 1 includes:

- Next.js App Router scaffold
- Tailwind CSS setup
- Supabase SSR clients for browser, server, and middleware
- Email and password login and signup flow
- Post-signup role selection for `creator` or `campaign`
- Creator onboarding page
- Campaign onboarding page
- Creator dashboard shell
- Campaign dashboard shell
- Marketing pages for campaigns, creators, and pricing
- Initial Supabase migration for milestone 1

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, and Storage
- Vercel

## Routes

- `/`
- `/for-campaigns`
- `/for-creators`
- `/pricing`
- `/login`
- `/signup`
- `/creator/onboarding`
- `/campaign/onboarding`
- `/dashboard/creator`
- `/dashboard/campaign`

## Initial data model

The migration in `supabase/migrations/20260319103000_politiviral_milestone_1.sql` creates:

- `profiles`
- `organizations`
- `creator_profiles`
- `campaign_profiles`

It also includes:

- an `auth.users` trigger that creates a `profiles` row automatically
- row-level security policies for milestone-1 ownership rules

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and provide:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are also supported for the public client key.

3. Create a Supabase project.

4. Apply the migration:

```bash
npx supabase db push
```

If you are not using the local Supabase CLI flow, run the SQL in `supabase/migrations/20260319103000_politiviral_milestone_1.sql` inside the Supabase SQL editor.

5. In Supabase Auth settings, add:

- Site URL: your production domain
- Redirect URLs:
- `http://localhost:3000/auth/callback`
- your Vercel preview URL with `/auth/callback`
- your production URL with `/auth/callback`

6. Start the app:

```bash
npm run dev
```

## Vercel env vars

Configure these in Vercel Project Settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

## Verification

Run:

```bash
npm run typecheck
npm run build
```

## Notes

- Milestone 1 intentionally focuses on auth, onboarding, dashboards, and a polished marketing layer.
- Pricing UI is included, but no live billing flow is implemented in this batch.
- Storage is part of the platform stack, but milestone 1 does not yet include upload workflows.
