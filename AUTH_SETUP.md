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

Email/password sign-up and sign-in, 18+ validation, PBKDF2 password hashing using Workers Web Crypto, secure sessions, business profile/knowledge persistence, channel-link persistence, message storage/review/reply/ignore, plan limits, and password change are implemented.

Password-reset email delivery is not faked. Add a transactional email provider before exposing a forgot-password flow.

## Production

Set `ALLOWED_ORIGIN` to the actual frontend origin, configure the Worker route, replace the D1 database ID, fill legal placeholders, and document retention/deletion practices.
