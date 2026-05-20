# SwiftCab — Futuristic AI Cab Booking Platform

A complete, production-grade cab-booking platform with a cinematic marketing site,
full rider/driver/admin dashboards, JWT auth, Stripe payments, and a Prisma + Postgres
backend.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Prisma · Postgres · Stripe · jose (JWT) · Zod**.

> Design inspiration: Uber × Tesla × Spotify × Apple × Awwwards.

---

## Highlights

### Marketing
- Cinematic hero with animated taxi mockup and live booking mini-form
- Live booking preview with a futuristic SVG map and animated route
- Services grid, "Why SwiftCab" feature cards, app showcase
- Driver partner section, testimonials, animated stats counters
- Animated FAQ accordion, final CTA panel, premium footer
- Futuristic preloader, floating AI assistant chat bubble

### Product surface
- **16 pages**: Home, About, Services, Pricing, Contact, Blog, FAQ, Terms, Privacy,
  Login, Signup, Booking flow, Live ride tracking, Payment, Booking success,
  Rider Dashboard, Driver Dashboard
- **Admin panel**: Analytics dashboard, Bookings, Drivers, Users, Payments, Support
- **Polymorphic primitives** (`GradientButton`, `Btn`) for valid `<a>`/`<button>` semantics
- Fully responsive (mobile, tablet, desktop, 4K)

### Backend
- **16 REST endpoints** for auth, bookings, drivers, users, payments, admin stats
- **JWT session** auth with HTTP-only cookies, secure password hashing (bcrypt)
- **Stripe** integration: PaymentIntents + signed webhook handler
- **Prisma schema** with 14 models (User, Driver, Vehicle, Booking, Payment,
  Coupon, SupportTicket, …) and ride-fare estimation engine
- **Edge middleware** protecting `/admin` and admin-scoped APIs (auto-bypassed in
  demo mode when `DATABASE_URL` is unset, so the UI stays browsable)

---

## Quickstart

```bash
npm install
cp .env.example .env.local        # optional — demo mode works without it
npm run dev                       # http://localhost:3000
```

That's it. The marketing site, dashboards, and admin panel are fully browsable
without any environment setup (demo mode).

### To enable the backend / database

```bash
# 1. Start Postgres (Docker example)
docker run -d --name swiftcab-pg -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=swiftcab postgres:16

# 2. Configure env
cp .env.example .env.local
#    fill in DATABASE_URL, JWT_SECRET, optional STRIPE_* keys

# 3. Set up schema + seed
npm run db:generate
npm run db:push       # or: npm run db:migrate
npm run db:seed       # creates demo admin + rider + driver
```

**Seeded credentials** (password `Password123!`):
- Admin: `admin@swiftcab.com`
- Rider: `maya@swiftcab.com`
- Driver: `daniel@swiftcab.com`

---

## API surface

| Method | Endpoint                          | Description                             |
| ------ | --------------------------------- | --------------------------------------- |
| POST   | `/api/auth/signup`                | Create account, sign in                 |
| POST   | `/api/auth/login`                 | Email/password sign in                  |
| POST   | `/api/auth/logout`                | Clear session                           |
| GET    | `/api/auth/me`                    | Current user                            |
| POST   | `/api/bookings/estimate`          | Fare quotes for ride types              |
| GET    | `/api/bookings`                   | List rider's bookings (paginated)       |
| POST   | `/api/bookings`                   | Create a booking                        |
| GET    | `/api/bookings/[id]`              | Booking detail (rider, driver, admin)   |
| PATCH  | `/api/bookings/[id]`              | Update status / assign driver           |
| DELETE | `/api/bookings/[id]`              | Cancel                                  |
| GET    | `/api/users`                      | Admin: list users                       |
| GET    | `/api/users/[id]`                 | Self or admin                           |
| PATCH  | `/api/users/[id]`                 | Update profile / status / tier          |
| DELETE | `/api/users/[id]`                 | Admin: suspend                          |
| GET    | `/api/drivers`                    | Admin: list drivers                     |
| POST   | `/api/drivers`                    | Admin: onboard driver                   |
| GET    | `/api/drivers/[id]`               | Admin: driver detail                    |
| PATCH  | `/api/drivers/[id]`               | Admin: change status / online flag      |
| POST   | `/api/payments/create-intent`     | Create Stripe PaymentIntent             |
| GET    | `/api/payments`                   | Admin: payments ledger                  |
| POST   | `/api/payments/[id]/refund`       | Admin: refund a charge                  |
| POST   | `/api/payments/webhook`           | Stripe webhook (raw body)               |
| GET    | `/api/admin/stats`                | Admin: top-level KPIs                   |

All responses are shaped as `{ ok: true, data: ... }` or
`{ ok: false, error: { message, details? } }`.

### Stripe webhook (locally)

```bash
stripe listen --forward-to localhost:3000/api/payments/webhook
# Copy the printed whsec_… into STRIPE_WEBHOOK_SECRET in .env.local
```

---

## Visual System

- **Fonts**: Satoshi, Clash Display, General Sans (Fontshare) + Inter (Google)
- **Colors**: Vibrant Yellow (`#facc15`), Electric Blue (`#3b82f6`), Dark Navy
  (`#0b1020`), Neon Purple (`#a855f7`)
- **Patterns**: Glassmorphism, animated blobs, grid backgrounds, gradient text,
  glow borders, custom scrollbar

---

## Folder Structure

```
prisma/
  schema.prisma            # Postgres schema (14 models)
  seed.ts                  # demo data seed
src/
  app/
    (marketing)/           # home, about, services, pricing, contact, blog,
                           # faq, terms, privacy + shared marketing layout
    (auth)/                # login, signup
    (dashboard)/           # rider + driver dashboards
    (booking)/             # booking flow, live ride, payment, success
    (admin)/admin/         # admin panel (6 pages)
    api/                   # 16 REST endpoints
    layout.tsx             # root layout
  components/
    Navbar, Footer, Preloader, AIChatBubble
    sections/              # 11 marketing sections
    ui/                    # AuroraBackground, GradientButton, SectionHeading,
                           # PageHero, LegalShell
    dashboard/             # DashboardShell, Sidebar, Topbar
    admin/                 # AdminShell, AdminUI (Card, StatusPill, FilterBar)
  lib/
    prisma.ts              # singleton client
    auth.ts                # JWT + bcrypt + cookie helpers
    stripe.ts              # Stripe client + isEnabled
    fare.ts                # pure fare estimation engine
    api-utils.ts           # response helpers, Zod parsing
    env.ts                 # centralised env access
    utils.ts               # cn() helper
    routes.ts              # centralised route map
  middleware.ts            # /admin + /api auth gate
.env.example
package.json
tailwind.config.ts
next.config.mjs
```

---

## Scripts

```bash
npm run dev          # next dev
npm run build        # next build (production)
npm run start        # next start
npm run lint         # next lint
npm run db:generate  # prisma generate
npm run db:push      # prisma db push (rapid schema sync)
npm run db:migrate   # prisma migrate dev (versioned migration)
npm run db:seed      # tsx prisma/seed.ts
npm run db:studio    # prisma studio (DB browser)
```

---

## Deploying to Vercel

1. Push the repo to GitHub.
2. Create a new project on [vercel.com](https://vercel.com/new) from the repo.
3. Add env vars from `.env.example` in the project settings.
4. Add a Postgres add-on (Vercel Postgres / Neon / Supabase) and copy its
   connection string into `DATABASE_URL`.
5. In the build settings, ensure the install command runs `prisma generate`
   (Vercel does this automatically when `@prisma/client` is in dependencies).
6. After the first deploy, run a one-off migration:
   ```bash
   npx prisma migrate deploy
   ```
7. (Optional) Add Stripe webhook in the Stripe Dashboard pointing to
   `https://<your-domain>/api/payments/webhook` and paste the secret into
   `STRIPE_WEBHOOK_SECRET`.

---

## Final production hardening

- Add rate limiting on auth endpoints (e.g. `@upstash/ratelimit`).
- Replace in-DB sessions with Redis if you need single sign-out at scale.
- Move static images behind a CDN (Vercel handles this automatically).
- Enable HSTS + CSP headers in `next.config.mjs`.
- Add monitoring (Sentry, Vercel Analytics, Speed Insights).
- Tighten `images.remotePatterns` to only your CDN once live.

---

Built with care. Have fun.
