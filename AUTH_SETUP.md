# TORI authentication setup

The website is wired to the Supabase project `tori` and uses its public publishable key in `auth.html`.

## Email authentication
Email/password sign-up and sign-in are implemented in `app.js`. Supabase email confirmation behavior follows the project's Auth settings.

## Age and terms
The account page requires an age-range selection, a truthful age declaration, and acceptance of the Terms, Privacy Policy and Acceptable Use Policy before account creation or .

The declaration is stored in Supabase user metadata for new email/password sign-up flows as:
- `age_band`
- `age_attested`
- `terms_accepted_at`
- `terms_version`

This is a product-level eligibility flow, not a substitute for jurisdiction-specific legal requirements or server-side enforcement.

## Important before launch
Replace the placeholders in the legal pages with the real legal business name, addresses, contact emails, governing law and actual retention/deletion practices. Verify the deployed TORI domain and Supabase email authentication settings before publishing the account feature.


## Required Supabase Auth setting
For real email ownership verification, keep **Confirm email** enabled in the `tori` project under Authentication → Providers → Email. Hosted Supabase projects enable email confirmation by default, but the setting should be verified before launch. The deployed site URL should be `https://tori.dewify.shop` and the confirmation redirect should be `https://tori.dewify.shop/auth.html?mode=signin&verified=1`.
