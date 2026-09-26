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

Email/password sign-up and sign-in, 18+ validation, PBKDF2 password hashing using Workers Web Crypto, secure sessions, profile/knowledge persistence, channel links, message storage/review/reply/ignore, plan limits, and password change.

Password reset email delivery is deliberately not faked; connect a transactional email provider before exposing a forgot-password flow.

## Production

Set `ALLOWED_ORIGIN` to the real frontend origin, configure the Worker route, replace the D1 database ID, fill the legal placeholders, and document real retention/deletion practices.
