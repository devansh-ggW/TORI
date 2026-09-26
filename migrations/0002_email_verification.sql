ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 1;
ALTER TABLE users ADD COLUMN email_verification_token_hash TEXT;
ALTER TABLE users ADD COLUMN email_verification_expires_at TEXT;
ALTER TABLE users ADD COLUMN email_verification_sent_at TEXT;
