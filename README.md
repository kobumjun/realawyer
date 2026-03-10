# SEDAM 법률사무소 – 금융사기 단체소송 접수센터

MVP Korean legal/claim-intake style SEO page generator.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Local JSON + in-memory storage (MVP)

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

## Set Admin Password

Create `.env.local` in the project root:

```
ADMIN_PASSWORD=your-secret-password
```

Then visit `/admin/login` and enter that password.

## Deploy to Vercel

1. Push the project to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Add environment variable: `ADMIN_PASSWORD` = your secret password.
4. Deploy.

Note: Admin-created cases are stored in memory and will not persist across Vercel serverless restarts. For production, connect a database (e.g. Postgres, MongoDB) and replace the logic in `lib/cases.ts`.
