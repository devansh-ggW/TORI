# TORI authentication and account setup

The website is wired to the Supabase project `tori` and uses its public publishable key from `tori-config.js`.

## Email authentication

Email/password sign-up and sign-in are implemented in `app.js`. Keep Supabase email confirmation enabled so a newly created email account must verify ownership before access.

## Google authentication

The account page calls Supabase Auth's Google OAuth flow with the production redirect:

`https://tori.dewify.shop/auth.html`

In the Supabase Dashboard for project `tori`, enable the Google provider and configure its Google OAuth Client ID and Client Secret. In Google Cloud, add the TORI site as an authorized JavaScript origin and add the Supabase project's Google callback URL shown in the Supabase provider settings.

The frontend implementation is already present. Provider credentials are intentionally not stored in this public repository.

## Age and eligibility

TORI requires users to be 18 or older. Email sign-up validates the date of birth before calling Supabase, and the database also rejects under-18 dates. Google sign-in accounts without an age-verified profile are shown an age gate before the account can open protected product areas.

Users attest that the information they submit is truthful. This is an eligibility control, not a guarantee about identity or a substitute for jurisdiction-specific legal requirements.

## Protected areas

Knowledge Studio, Core Lab and Messages require an authenticated account with an age-verified profile.

## Messages

Business-related messages are stored in `public.messages` only after the business-message filter accepts them. The generic Supabase Edge Function `tori-ingest-message` is live and requires a valid Supabase JWT.

Current plan limits are enforced in the database:

- Free: 5 stored messages / 5 replies
- Pro: 25 stored messages / 25 replies
- Premium: 100 stored messages / 100 replies

Checkout and plan upgrades are not active yet.

## Before launch

Replace the placeholders in the legal pages with the real legal business name, addresses, contact emails, governing law, retention/deletion practices, and any platform-specific connector disclosures.

Verify the deployed site URL in Supabase Auth URL Configuration:

`https://tori.dewify.shop`

Also add that exact production URL to the Supabase redirect allow list and complete the Google provider configuration before advertising Google login.
