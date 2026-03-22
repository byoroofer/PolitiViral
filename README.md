# PolitiViral

PolitiViral is a premium political creator activation platform for campaigns, PACs, advocacy groups, and creators.

Milestone 1 includes:

- Next.js App Router scaffold
- Tailwind CSS setup
- Supabase SSR clients for browser, server, and middleware
- Email and password login and signup flow
- Magic link login request flow
- Password reset request and password update flow
- App-native auth confirmation routes
- Post-signup role selection for `creator` or `campaign`
- Creator onboarding page
- Campaign onboarding page
- Creator dashboard shell
- Campaign dashboard shell
- Marketing pages for campaigns, creators, and pricing
- Initial Supabase migration for milestone 1
- Branded Supabase Auth email sending through a Send Email Hook

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Postgres, and Storage
- Vercel
- Resend via Supabase Send Email Hook for branded auth mail

## Routes

- `/`
- `/for-campaigns`
- `/for-creators`
- `/pricing`
- `/login`
- `/signup`
- `/reset-password`
- `/auth/confirm`
- `/auth/callback`
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
AUTH_EMAIL_APP_NAME=PolitiViral
AUTH_EMAIL_APP_URL=http://localhost:3000
AUTH_EMAIL_FROM_NAME=PolitiViral
AUTH_EMAIL_FROM_EMAIL=no-reply@example.com
AUTH_EMAIL_SUPPORT_EMAIL=support@example.com
AUTH_EMAIL_PRIMARY_COLOR=#0b4bb8
AUTH_EMAIL_LOGO_URL=http://localhost:3000/politiviral-auth-email-logo.svg
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are also supported for the public client key.

3. Create a Supabase project.

4. Apply the migration:

```bash
npx supabase db push
```

If you are not using the local Supabase CLI flow, run the SQL in `supabase/migrations/20260319103000_politiviral_milestone_1.sql` inside the Supabase SQL editor.

5. Deploy the Send Email Hook function:

```bash
supabase functions deploy auth-send-email --no-verify-jwt
```

6. Copy `supabase/functions/.env.example` to `supabase/functions/.env`, fill in your email provider secrets, and set the function secrets:

```bash
supabase secrets set --env-file supabase/functions/.env
```

7. In Supabase Auth settings, add:

- Site URL: your production domain
- Redirect URLs:
- `http://localhost:3000/auth/callback`
- `http://localhost:3000/reset-password`
- your Vercel preview URL with `/auth/callback`
- your Vercel preview URL with `/reset-password`
- your production URL with `/auth/callback`
- your production URL with `/reset-password`

8. In Supabase Auth Hooks, create a `Send Email` hook:

- Hook type: `HTTPS`
- URL: your deployed `auth-send-email` function URL
- Generate a webhook secret
- Save the generated secret as `SEND_EMAIL_HOOK_SECRET` in Supabase Function secrets

9. Start the app:

```bash
npm run dev
```

## Auth email architecture

PolitiViral uses the Supabase Send Email Hook path instead of the default Supabase shared sender.

Why this path:

- the sender identity comes from your verified domain and provider account
- the HTML, subjects, footer, and brand styling live in code
- every auth email action can use app-native PolitiViral links
- Supabase remains the auth backend, but the user-facing email layer is fully app-branded

The hook lives at:

- `supabase/functions/auth-send-email/index.ts`

The email logo asset lives at:

- `public/politiviral-auth-email-logo.svg`

The app-native auth landing routes are:

- `/auth/confirm`
- `/auth/callback`
- `/reset-password`

## Manual Supabase dashboard changes

These steps still need to be set in the Supabase dashboard for production:

1. Auth -> Providers -> Email
- Keep Email auth enabled.

2. Auth -> URL Configuration
- Set `Site URL` to `https://politiviral.com`
- Add redirect URLs for:
  - `https://politiviral.com/auth/callback`
  - `https://politiviral.com/reset-password`
  - your preview URLs
  - localhost during development

3. Auth -> Hooks -> Send Email
- Create an HTTPS Send Email Hook.
- Point it to the deployed `auth-send-email` function URL.
- Generate the hook secret and save it as `SEND_EMAIL_HOOK_SECRET`.

4. Auth -> Templates
- Do not rely on the default Supabase shared email HTML in production once the hook is active.
- Keep the template subjects/body aligned with the hook setup or document them as unused.

5. Project Settings -> Custom Domains
- Optional but recommended: configure an auth-aligned custom domain such as `auth.politiviral.com` if your plan and infrastructure support it.
- Once active, use that branded domain for auth-facing URLs and update redirects if needed.

## Provider and DNS setup for branded sending

The repo is wired for Resend by default, but the same branded-sender pattern can be adapted to another provider if you change the hook implementation.

For Resend production setup:

1. Add and verify your sending domain in Resend.
2. Create a branded sender such as:
- From name: `PolitiViral`
- From email: `no-reply@yourdomain.com`
3. Publish the DNS records Resend gives you.
  Typical records include:
- SPF / TXT
- DKIM / CNAME
- sometimes a tracking or return-path record depending on provider setup
4. Wait for provider verification to complete before using the sender in production.

## Vercel env vars

Configure these in Vercel Project Settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

## Supabase Function secrets

Configure these in Supabase project secrets for the `auth-send-email` function:

- `RESEND_API_KEY`
- `SEND_EMAIL_HOOK_SECRET`
- `AUTH_EMAIL_APP_NAME`
- `AUTH_EMAIL_APP_URL`
- `AUTH_EMAIL_FROM_NAME`
- `AUTH_EMAIL_FROM_EMAIL`
- `AUTH_EMAIL_SUPPORT_EMAIL`
- `AUTH_EMAIL_PRIMARY_COLOR`
- `AUTH_EMAIL_LOGO_URL`

## Verification

Run:

```bash
npm run typecheck
npm run build
```

## Auth email test checklist

Run these production-like tests after hook deployment and provider verification:

- Sign up confirmation
  - create a new account
  - confirm the email sender is your branded sender/domain
  - confirm the email uses PolitiViral branding and logo
  - click the link and verify it lands on app-native PolitiViral routes

- Magic link login
  - request a magic link from `/login`
  - confirm the subject, branding, and sender identity
  - click the link and confirm it returns to the app and signs in successfully

- Forgot password
  - request a reset from `/reset-password`
  - confirm the sender, branding, and reset copy
  - click the link and verify the user lands on `/reset-password?mode=update`
  - finish the password change

- Invite
  - send an invite through your admin tooling or Supabase admin API
  - confirm the invite email uses PolitiViral branding and app-native confirm routes

- Email change
  - initiate an email change for an existing user
  - confirm both current-email and new-email messages are branded
  - verify both links work as expected if secure email change is enabled

- Reauthentication
  - trigger a reauthentication flow
  - confirm the email carries a branded one-time verification code and footer

- Mobile and desktop rendering
  - open each email on a narrow/mobile client
  - open each email on a desktop client
  - verify CTA button readability, logo rendering, spacing, and footer legibility

## Notes

- Milestone 1 intentionally focuses on auth, onboarding, dashboards, and a polished marketing layer.
- Pricing UI is included, but no live billing flow is implemented in this batch.
- Storage is part of the platform stack, but milestone 1 does not yet include upload workflows.
- The Send Email Hook is the production source of truth for auth email HTML and subjects in this repo.
