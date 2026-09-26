# ReplyFlix Cloudflare backend

ReplyFlix uses a Cloudflare Worker + D1 for accounts, sessions, business profiles, knowledge and message storage.

## Create the D1 database

`npx wrangler d1 create replyflix`

Copy the returned database ID into `wrangler.toml`.

## Apply the schema

`npx wrangler d1 migrations apply replyflix --local`

For production:

`npx wrangler d1 migrations apply replyflix --remote`

## Deploy

`npx wrangler deploy`

The frontend uses `/api` by default. Route the Worker on the same ReplyFlix hostname, or set `apiBase` in `replyflix-config.js` to the Worker URL.

## Backend included

Email/password sign-up and sign-in, 18+ validation, email verification through Resend, PBKDF2 password hashing using Workers Web Crypto, secure sessions, business profile/knowledge persistence, channel-link persistence, message storage/review/reply/ignore, plan limits, password change, and account deletion are implemented.

Email verification sends through Resend. Configure the Worker secrets `RESEND_API_KEY` and `RESEND_FROM`. `RESEND_FROM` must be an address on a domain verified in Resend (for example `ReplyFlix <noreply@your-verified-domain.com>`). The sending domain/address must be configured in Resend. Password-reset email delivery is not yet implemented.

## Production

Set `ALLOWED_ORIGIN` to the actual frontend origin, configure the Worker route, replace the D1 database ID, fill legal placeholders, and document retention/deletion practices.

## Email verification

The Worker adds the email-verification columns to an existing `users` table automatically through its schema check. Existing accounts are preserved as verified; new signups remain unverified until the Resend link is used.
