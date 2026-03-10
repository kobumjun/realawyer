import Header from "@/components/Header";
import { getCaseBySlug } from "@/lib/cases";

export const dynamic = "force-dynamic";

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const data = getCaseBySlug(params.slug);

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
