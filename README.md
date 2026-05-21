<div align="center">

# 🚕 SwiftCab

### The future of urban mobility — AI-powered cab booking, beautifully crafted.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://cabbooking-nine.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

**[🌐 Live Demo](https://cabbooking-nine.vercel.app)** · **[🐛 Report Bug](https://github.com/coolBablu/cabbooking/issues)** · **[✨ Request Feature](https://github.com/coolBablu/cabbooking/issues)**

</div>

---

## 🎬 Preview

![SwiftCab Hero](./public/screenshots/hero.png)

> A cinematic cab-booking experience inspired by **Uber × Tesla × Spotify × Apple × Awwwards** — built end-to-end with Next.js 15, JWT auth, role-based access control, and a real-time interactive map.

---

## ✨ What it does

SwiftCab is a full-stack cab-booking platform with three distinct experiences:

| For Riders | For Drivers | For Admins |
|---|---|---|
| 🗺️ Book rides with live map preview | 💰 Track real-time earnings | 📊 Bookings analytics |
| 💳 Estimate fare across ride types | 🟢 Online/offline toggle | 🚗 Manage drivers |
| 📍 Save favorite places | 🚖 Accept/decline trip requests | 👥 User management |
| 🎁 Loyalty rewards & wallet | ⭐ Rating & analytics | 💸 Payment ledger |
| 🌙 Premium dark UI | 📅 Schedule view | 🎧 Support tickets |

### Highlight features

- 🎨 **Award-winning UI** — Framer Motion animations, glassmorphism, animated blobs, gradient lighting
- 🔐 **Production-grade auth** — JWT (httpOnly cookies), role-based middleware (RIDER / DRIVER / ADMIN), bfcache-safe sign-out
- 🗺️ **Real interactive map** — Leaflet + OpenStreetMap, OSRM live route geometry, animated car follows the polyline
- 🛡️ **Edge-protected routes** — `/dashboard`, `/driver`, `/admin/*`, `/booking`, `/payment` all gated at the edge
- 💸 **Stripe-ready** — PaymentIntents + signed webhooks (gracefully mocks in demo mode)
- 📱 **Fully responsive** — mobile, tablet, desktop, 4K

---

## 🚀 Live Demo

**👉 [cabbooking-nine.vercel.app](https://cabbooking-nine.vercel.app)**

### Demo accounts (password: `Password123!`)

| Role | Email | What you see |
|---|---|---|
| 👨‍💼 **Admin** | `admin@swiftcab.com` | Full admin panel — analytics, bookings, drivers, users, payments, support |
| 🧑 **Rider** | `maya@swiftcab.com` | Rider dashboard — bookings, wallet, trips |
| 🚗 **Driver** | `daniel@swiftcab.com` | Driver dashboard — earnings, requests, schedule |

> Or sign up with any email — your account works immediately within the same session.

---

## 📸 Screenshots

<table>
  <tr>
    <td><img src="./public/screenshots/landing.png" alt="Landing page" /></td>
    <td><img src="./public/screenshots/booking.png" alt="Booking flow" /></td>
  </tr>
  <tr>
    <td align="center"><strong>Landing</strong> — Cinematic hero with live map</td>
    <td align="center"><strong>Booking</strong> — Real-time fare estimate</td>
  </tr>
  <tr>
    <td><img src="./public/screenshots/rider-dashboard.png" alt="Rider dashboard" /></td>
    <td><img src="./public/screenshots/admin.png" alt="Admin panel" /></td>
  </tr>
  <tr>
    <td align="center"><strong>Rider Dashboard</strong> — Trips, wallet, savings</td>
    <td align="center"><strong>Admin Panel</strong> — Analytics & management</td>
  </tr>
</table>

> ℹ️ See [`public/screenshots/README.md`](./public/screenshots/README.md) for the list of screenshots to add (filename, dimensions, capture tips).

---

## 🛠️ Tech Stack

### Frontend
- ⚡ **[Next.js 15](https://nextjs.org)** (App Router, Server Components)
- 🎯 **[TypeScript 5](https://www.typescriptlang.org)**
- 🎨 **[Tailwind CSS 3](https://tailwindcss.com)**
- ✨ **[Framer Motion](https://www.framer.com/motion)** (animations)
- 🗺️ **[Leaflet](https://leafletjs.com)** + **[OpenStreetMap](https://www.openstreetmap.org)** + **[OSRM](https://project-osrm.org)** (interactive map)
- 🎯 **[Lucide React](https://lucide.dev)** (icons)

### Backend
- 🔐 **[jose](https://github.com/panva/jose)** (JWT signing/verification, edge-compatible)
- 🔒 **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** (password hashing)
- 🗄️ **[Prisma 6](https://www.prisma.io)** + **PostgreSQL** (ORM + database)
- 💳 **[Stripe](https://stripe.com)** (payments, optional)
- ✅ **[Zod](https://zod.dev)** (runtime validation)

### Deployment
- ▲ **[Vercel](https://vercel.com)** (auto-deploy from `main`)
- 🐙 **GitHub** (CI via push)

---

## 🏃 How to run locally

### Prerequisites

- Node.js **18+** ([download](https://nodejs.org/))
- npm (comes with Node) or `pnpm` / `yarn`
- (Optional) PostgreSQL or Docker — only needed for real database persistence

### Setup in 3 commands

```bash
# 1. Clone & install
git clone https://github.com/coolBablu/cabbooking.git
cd cabbooking
npm install

# 2. Create env file (demo mode works without filling anything)
cp .env.example .env.local

# 3. Run
npm run dev
```

➡️ Open [http://localhost:3000](http://localhost:3000). Login with demo accounts above. ✨

### To unlock real persistence (optional)

```bash
# Start a local Postgres via Docker
docker run -d --name swiftcab-pg -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=swiftcab postgres:16

# Edit .env.local — set DATABASE_URL:
#   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/swiftcab?schema=public"

# Migrate + seed
npm run db:push
npm run db:seed
```

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server at `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Sync Prisma schema with database |
| `npm run db:migrate` | Create + apply versioned migration |
| `npm run db:seed` | Seed database with demo accounts |
| `npm run db:studio` | Open Prisma Studio (visual DB browser) |

---

## 📂 Project Structure

```
cabbooking/
├── prisma/
│   ├── schema.prisma       # 14 models — User, Driver, Booking, Payment, …
│   └── seed.ts             # Demo data seed
├── public/
│   └── screenshots/        # Screenshots used in this README
├── src/
│   ├── app/
│   │   ├── (marketing)/    # Home, About, Services, Pricing, Contact, Blog, FAQ, Terms, Privacy
│   │   ├── (auth)/         # Login, Signup, Forgot Password
│   │   ├── (dashboard)/    # Rider + Driver dashboards (role-gated)
│   │   ├── (booking)/      # Booking flow, payment, success, live ride
│   │   ├── (admin)/        # Admin panel (6 pages, ADMIN-only)
│   │   ├── api/            # 16 REST endpoints
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   ├── sections/       # 11 marketing sections
│   │   ├── ui/             # Buttons, modals, map, notifications
│   │   ├── dashboard/      # Sidebar, topbar, shell
│   │   ├── admin/          # Admin shell + UI primitives
│   │   └── auth/           # AuthProvider, SignOutButton
│   ├── lib/
│   │   ├── auth.ts         # JWT + bcrypt + cookies
│   │   ├── session-edge.ts # Edge-safe session helpers
│   │   ├── auth-server.ts  # Server-side user hydration
│   │   ├── prisma.ts       # Prisma singleton
│   │   ├── user-store.ts   # Dual-mode user store (Prisma + demo file)
│   │   ├── stripe.ts       # Stripe client (graceful when keys missing)
│   │   └── fare.ts         # Fare estimation engine
│   └── middleware.ts       # Edge runtime — auth + role gates + bfcache headers
├── .env.example
└── package.json
```

---

## 🔌 API Surface

All API responses use a uniform envelope:

```json
// Success
{ "ok": true, "data": { ... } }

// Error
{ "ok": false, "error": { "message": "Reason", "details": {} } }
```

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Create account, auto sign-in |
| `POST` | `/api/auth/login` | Email/password sign-in |
| `POST` | `/api/auth/logout` | Clear session cookie |
| `GET` | `/api/auth/me` | Current user (or `null`) |
| `POST` | `/api/bookings/estimate` | Fare quotes across ride types |
| `GET` | `/api/bookings` | List rider's bookings (paginated) |
| `POST` | `/api/bookings` | Create a new booking |
| `GET` | `/api/bookings/[id]` | Booking detail |
| `PATCH` | `/api/bookings/[id]` | Update status / assign driver |
| `DELETE` | `/api/bookings/[id]` | Cancel booking |
| `POST` | `/api/payments/create-intent` | Create Stripe PaymentIntent |
| `POST` | `/api/payments/webhook` | Stripe webhook handler |
| `GET` | `/api/admin/stats` | Admin: top-level KPIs |
| `GET` | `/api/users` | Admin: list users |
| `GET` | `/api/drivers` | Admin: list drivers |
| ... | _(more — see [`src/app/api`](./src/app/api))_ | |

---

## 🚢 Deployment (Vercel)

This project is configured for **zero-config deployment** to Vercel.

1. **Push to GitHub** — already done if you cloned this repo.
2. **Import on Vercel** → [vercel.com/new](https://vercel.com/new)
3. **Add environment variable** (REQUIRED):
   - `JWT_SECRET` — long random string. Generate with:
     ```bash
     node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
     ```
   - Add to **Production, Preview, Development** all three.
4. **Deploy** — that's it. Every `git push origin main` auto-deploys.

> ⚠️ **Without `JWT_SECRET`**, login on Vercel will run into a redirect loop. See [`.env.example`](./.env.example) for the full list of optional integrations (database, Stripe, Google Maps, SMTP).

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary | `#facc15` (Vibrant Yellow) |
| Accent | `#3b82f6` (Electric Blue) |
| Background | `#0b1020` (Dark Navy) |
| Glow | `#a855f7` (Neon Purple) |
| Display | **Clash Display** (Fontshare) |
| Body | **Inter** (Google Fonts) |

---

## 🤝 Contributing

This is a portfolio / learning project. PRs welcome for:
- New ride types / pricing models
- Additional language support (i18n)
- Map integrations (Mapbox, Google Maps)
- Test coverage (Vitest + Playwright)

---

## 📄 License

[MIT](./LICENSE) © 2026 — built with care.

---

<div align="center">

**[⭐ Star on GitHub](https://github.com/coolBablu/cabbooking)** if you find this useful!

Made with ☕ + 🎵 + a lot of Framer Motion

</div>
