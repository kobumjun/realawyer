import Header from "@/components/Header";
import CaseCard from "@/components/CaseCard";
import { getCases } from "@/lib/cases";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "현재 진행 중인 주요 사건 | SEDAM 법률사무소",
  description: "다양한 금융사기 사건에 대한 피해자 공동 대응 및 법적 절차 진행 현황.",
};

export default function CasesPage() {
  const cases = getCases();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900/20 via-slate-50 to-slate-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">현재 진행 중인 주요 사건</h1>
          <p className="mt-4 text-blue-100">
            현재 다양한 금융사기 사건에 대해 피해자 공동 대응 및 법적 절차가 진행되고 있습니다.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
