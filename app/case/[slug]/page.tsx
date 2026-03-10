import Header from "@/components/Header";
import { getCaseBySlug } from "@/lib/cases";

export const dynamic = "force-dynamic";

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  const data = slug ? getCaseBySlug(slug) : null;

  if (!data) {
    return (
      <>
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-12 text-gray-600">
          사건을 찾을 수 없습니다.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
        <p className="text-gray-600 mt-4">{data.description}</p>
      </div>
    </>
  );
}
