import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";

export const dynamic = "force-dynamic";

async function getCasesFromApi() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/cases`, { cache: "no-store" });
  return res.json();
}

export default async function Home() {
  const cases = await getCasesFromApi();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      <Header />
      <main>
        <HomeClient cases={cases} />
      </main>
    </div>
  );
}
