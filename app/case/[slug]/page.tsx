import Header from "@/components/Header";
import HeroSection from "@/components/ui/HeroSection";
import InfoBox from "@/components/ui/InfoBox";
import CTASection from "@/components/ui/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import { getCaseBySlug } from "@/lib/cases";
import type { Case } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatDetailHero(data: Case) {
  const kw = (data.keywords || "").trim();
  const headline = kw ? `[${kw}] 사칭·사기 의심` : data.title;
  const subline = data.status || "피해자 단체소송 접수 진행중";
  return { headline, subline };
}

function InfoGrid({ data }: { data: Case }) {
  const items: { title: string; content: string }[] = [
    { title: "모집대상 / 소송 참여 자격", content: data.victimType || data.description || "-" },
    { title: "피해유형", content: data.damageType || "-" },
    { title: "소송방식", content: data.lawsuitType || data.litigationMethod || "-" },
    { title: "필요서류", content: data.requiredDocs || data.documents || "-" },
    { title: "진행절차", content: data.process || "-" },
    { title: "상담비용 / 상담안내", content: data.phone ? `상담 전화: ${data.phone}` : "상담 신청 시 안내" },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <InfoBox key={item.title} title={item.title} content={item.content} />
      ))}
    </div>
  );
}

export default async function CasePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;
  const data = slug ? await getCaseBySlug(slug) : null;

  if (!data) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <p className="text-slate-600">사건을 찾을 수 없습니다.</p>
        </div>
      </>
    );
  }

  const { headline, subline } = formatDetailHero(data);

  return (
    <>
      <Header />
      <HeroSection
        title={headline}
        subtitle={subline}
        supportingLine={data.tagline}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <section className="mb-16">
          <SectionHeader
            title="사건 개요"
            subtitle="참여 자격, 피해유형, 소송방식 등을 확인해 주세요."
          />
          <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 leading-relaxed shadow-sm">
            {data.description}
          </p>
        </section>

        <section className="mb-16">
          <SectionHeader title="상세 정보" subtitle="필요서류 및 진행절차를 확인해 주세요." />
          <InfoGrid data={data} />
        </section>

        <section className="mb-16">
          <SectionHeader title="상담 신청" subtitle="피해 상황을 간단히 적어주시면 검토 후 연락드립니다." />
          <CTASection />
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50/50 p-8">
          <h2 className="text-lg font-bold text-slate-800">상담 안내</h2>
          <p className="mt-2 text-slate-600">
            본 페이지에서 신청하신 내용은 담당 변호사가 검토 후 연락드립니다.
            긴급한 경우 고객센터로 직접 문의해 주세요.
          </p>
          <a
            href="/contact"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
          >
            고객센터로 이동
          </a>
        </section>
      </div>
    </>
  );
}
