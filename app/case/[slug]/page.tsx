import Header from "@/components/Header";

async function getCase(slug: string) {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${base}/api/cases`, { cache: "no-store" });
  const data = await res.json();
  return data.find((c: { slug: string }) => c.slug === slug);
}

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getCase(params.slug);

  if (!data) {
    return (
      <>
        <Header />
        <div style={{ padding: "40px" }}>Case not found</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={{ padding: "40px" }}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
    </>
  );
}
