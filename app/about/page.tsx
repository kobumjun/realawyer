import Header from "@/components/Header";

export const metadata = {
  title: "금융사기 피해 대응 전문 로펌 | SEDAM 법률사무소",
  description: "보이스피싱, 투자사기, 가상자산 사기 등 금융범죄 피해 대응 전문.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">금융사기 피해 대응 전문 로펌</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-16">
        <section className="rounded-xl bg-white p-8 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Introduction</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              저희 로펌은 보이스피싱, 투자사기, 가상자산 사기 등 금융범죄 피해 대응을 중심으로 법률 서비스를 제공합니다.
            </p>
            <p>
              형사 고소부터 민사 손해배상까지 사건 전반에 대한 법적 대응을 지원합니다.
            </p>
          </div>
        </section>

        <section className="rounded-xl bg-white p-8 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Key strengths</h2>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              금융사기 사건 전문 대응
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              형사 + 민사 통합 소송 진행
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              피해 회복 중심 전략
            </li>
          </ul>
        </section>

        <section className="rounded-xl bg-white p-8 shadow-lg">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Closing</h2>
          <p className="text-slate-600 leading-relaxed">
            피해 사실이 확인된 경우 전문 담당 변호사가 사건을 검토하고 적절한 대응 방향을 안내드립니다.
          </p>
        </section>
      </div>
    </div>
  );
}
