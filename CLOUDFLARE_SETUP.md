# ReplyFlix Cloudflare backend

ReplyFlix uses a Cloudflare Worker + D1 for accounts, sessions, business profiles, knowledge and message storage.

## Create the database

`npx wrangler d1 create replyflix`

Copy the returned database ID into `wrangler.toml`.

## Apply the schema

`npx wrangler d1 migrations apply replyflix --local`

Then:

`npx wrangler d1 migrations apply replyflix --remote`

## Deploy the API

`npx wrangler deploy`

The frontend calls `/api` by default. Route the Worker on the same ReplyFlix hostname, or set `apiBase` in `replyflix-config.js` to the Worker URL.

## Included

Email/password sign-up and sign-in, 18+ validation, email verification through Resend, PBKDF2 password hashing using Workers Web Crypto, secure sessions, profile/knowledge persistence, channel links, message storage/review/reply/ignore, plan limits, password change, and account deletion.

Email verification sends through Resend. Configure the Worker secret `RESEND_API_KEY`; optionally set `RESEND_FROM` (otherwise `ReplyFlix <noreply@tori.dewify.shop>` is used). The sending domain/address must be configured in Resend. Password reset is not yet implemented.

## Production

Set `ALLOWED_ORIGIN` to the real frontend origin, configure the Worker route, replace the D1 database ID, fill the legal placeholders, and document real retention/deletion practices.

## Email verification

The Worker adds the email-verification columns to an existing `users` table automatically through its schema check. Existing accounts are preserved as verified; new signups remain unverified until the Resend link is used.
