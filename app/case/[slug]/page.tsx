import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

const getCasesFromApi = async () => {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/cases`, { cache: "no-store" });
  return res.json();
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cases = await getCasesFromApi();
  const caseItem = cases.find((c: { slug: string }) => c.slug === params.slug);
  if (!caseItem) {
    return { title: "사건을 찾을 수 없습니다" };
  }

  const title = `${caseItem.title} | SEDAM 법률사무소 단체소송`;
  const description =
    caseItem.description || `${caseItem.title} 피해자 단체소송 진행중. 전문 변호사 상담.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CasePage({ params }: Props) {
  const cases = await getCasesFromApi();
  const caseItem = cases.find((c: { slug: string }) => c.slug === params.slug);

  if (!caseItem) notFound();

  const mainBody = caseItem.content ?? caseItem.description;
  const sections = [
    { title: "소송 참여 자격", content: caseItem.victimType ?? caseItem.tagline ?? caseItem.description },
    { title: "피해유형", content: caseItem.victimType ?? caseItem.damageType },
    { title: "소송방식", content: caseItem.lawsuitType ?? caseItem.litigationMethod },
    { title: "준비서류", content: caseItem.documents ?? caseItem.requiredDocs },
    { title: "진행절차", content: caseItem.process },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:underline">
              홈
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{caseItem.title}</span>
          </nav>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {caseItem.title}
          </h1>
          {caseItem.tagline && <p className="mt-2 text-blue-100">{caseItem.tagline}</p>}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-xl bg-white p-6 shadow-lg mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">사건 개요</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line">{mainBody}</p>
        </div>

        <div className="space-y-6">
          {sections.map(
            (s) =>
              s.content && (
                <div
                  key={s.title}
                  className="rounded-xl bg-white p-6 shadow-lg"
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 whitespace-pre-line">
                    {s.content}
                  </p>
                </div>
              )
          )}
        </div>

        <div className="mt-12 rounded-xl bg-blue-50 border border-blue-100 p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            24시간 상담 안내
          </h3>
          <p className="text-slate-600 mb-4">
            전문 변호사와 24시간 전화 상담이 가능합니다. 사건 관련 문의사항은
            아래 번호로 연락 주시기 바랍니다.
          </p>
          <a
            href={`tel:${(caseItem.phone || "1588-0000").replace(/-/g, "")}`}
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition"
          >
            {caseItem.phone || "1588-0000"} (24시간)
          </a>
        </div>
      </div>
    </div>
  );
}
