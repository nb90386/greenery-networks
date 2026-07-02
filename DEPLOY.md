# Deploying Greenery Networks

This site is a Next.js 16 app. It runs cleanly on Vercel. NameSilo holds the
domain. We keep NameSilo as the DNS host so email and other records live in
one place.

Follow these steps in order.

## 1. Push the repo to GitHub

```bash
git add -A
git commit -m "Ready to deploy"
git push origin main
```

Confirm the repo is visible in GitHub.

## 2. Import the repo in Vercel

1. Go to <https://vercel.com/new>.
2. Click **Import** next to the `greenery-networks` repo.
3. Framework preset: **Next.js**.
4. Root directory: leave as the repo root.
5. Environment variables: none are required for the first deploy. Copy from
   `.env.example` when Shopify is ready (Prompt 8).
6. Click **Deploy**.
7. Wait for the build to finish, then open the assigned `*.vercel.app` URL.
   Confirm the home page loads and the cart drawer opens.

## 3. Add the domain in Vercel

1. In Vercel, open the project.
2. **Settings → Domains**.
3. Add `greenerynetworks.com` (the apex).
4. Add `www.greenerynetworks.com` (the subdomain).
5. Vercel will show you the DNS records to add. Keep that tab open. You will
   need the `A` record value for `@` and the `CNAME` value for `www`. Both
   are typically:
   - Apex `A` record value: `76.76.21.21`
   - `www` `CNAME` value: `cname.vercel-dns.com`
   If Vercel shows a different IP for your project, use the value Vercel
   shows in your dashboard.

## 4. Update DNS at NameSilo

We keep NameSilo's nameservers so other records (email, etc.) are preserved.

1. Log in at <https://www.namesilo.com>.
2. **Domain Manager**, click the domain.
3. Open **DNS Records** (sometimes labeled DNS Manager or Manage DNS).
4. Make these changes:
   - Delete any existing parked or default `A` record on host `@` that
     NameSilo created.
   - Delete any auto created `A` record on host `www` so it will not
     conflict with the new `CNAME`.
   - Add an **A** record:
     - Host: `@`
     - Value: `76.76.21.21` (or the IP Vercel showed you)
     - TTL: `Automatic` (or `3600`)
   - Add a **CNAME** record:
     - Host: `www`
     - Value: `cname.vercel-dns.com`
     - TTL: `Automatic` (or `3600`)
5. Save.

## 5. Wait for verification and SSL in Vercel

1. Head back to Vercel **Settings → Domains**.
2. Wait 15 to 30 minutes for both domains to verify.
3. Vercel auto issues the SSL certificate. No action needed there.
4. Set the primary domain. Pick either `greenerynetworks.com` or
   `www.greenerynetworks.com` and enable the redirect from the other so the
   site has one canonical URL.

## 6. Verify the live site

Open the live URL and click through:

- [ ] Home loads over `https://`
- [ ] `/shop` renders the grid and filters
- [ ] A PDP loads
- [ ] Add to cart → the drawer opens
- [ ] `/cart` loads (the checkout button will show the "coming soon"
      message until Shopify is wired up in Prompt 8)
- [ ] `/finder` walks through all seven steps
- [ ] `/care`, `/about`, `/shipping`, `/faq`, `/contact` load
- [ ] `/robots.txt` and `/sitemap.xml` respond
- [ ] Favicon shows in the browser tab
- [ ] Share the URL in a Slack or iMessage and confirm the OG preview looks
      right

## 7. When Shopify is ready (Prompt 8)

1. Add the Shopify env vars in Vercel **Settings → Environment Variables**.
2. Redeploy.
3. Confirm the cart's Checkout button now redirects to Shopify.

That's it. Any follow up bugs? Fix them locally, push to `main`, Vercel
redeploys automatically.
