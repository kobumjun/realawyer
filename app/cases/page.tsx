import Header from "@/components/Header";
import HeroSection from "@/components/ui/HeroSection";
import CasesList from "@/components/CasesList";
import { getCases } from "@/lib/cases";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await getCases();
  const items = cases
    .filter((c) => c?.slug)
    .map((c) => ({
      slug: c.slug,
      title: c.title,
      description: c.description || "",
    }));

  return (
    <>
      <Header />
      <HeroSection
        title="진행 중인 금융사기 피해 대응 사건"
        subtitle="전문 법률 검토 후 적절한 대응 방향을 안내드립니다."
        supportingLine="금융사기·투자 피해 대응 전문"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800">
            현재 접수 진행 중인 사건
          </h2>
          <p className="mt-1 text-slate-600">
            아래 사건 중 해당하시는 경우 상세 페이지에서 자세한 내용을 확인하시고, 상담을 신청해 주세요.
          </p>
        </div>

        <CasesList cases={items} />
      </div>
    </>
  );
}
