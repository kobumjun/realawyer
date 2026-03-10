# 법무법인 신결 – 금융사기 단체소송 접수센터

MVP Korean legal/claim-intake style SEO page generator.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Postgres) for case storage

## Project Structure

```
app/
├── page.tsx              # Homepage
├── layout.tsx            # Root layout
├── case/[slug]/page.tsx  # Dynamic SEO case pages
├── admin/
│   ├── page.tsx          # Admin dashboard (protected)
│   └── login/page.tsx    # Admin login
├── api/
│   ├── admin/login/      # Password verification
│   └── cases/            # Case CRUD (POST)
components/
├── Header.tsx
├── CaseCard.tsx
└── HomeClient.tsx
lib/
├── cases.ts              # Case data & addCase
├── auth.ts               # Cookie-based admin auth
└── types.ts
data/
└── cases.json            # Initial 8 case entries
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL Editor.
3. Run `supabase/seed.sql` to insert initial cases.
4. Add env vars to `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL` (Project Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API, service_role)

## Set Admin Password

Add to `.env.local`:

```
ADMIN_PASSWORD=your-secret-password
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Add env vars: `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
4. Deploy.
