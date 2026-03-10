import Header from "@/components/Header";

export const metadata = {
  title: "단체소송 진행 절차 | SEDAM 법률사무소",
  description: "상담 신청부터 피해 회복까지 단체소송 진행 절차 안내.",
};

const steps = [
  {
    step: 1,
    title: "상담 신청",
    description: "온라인 또는 전화 상담을 통해 피해 사실을 확인합니다.",
  },
  {
    step: 2,
    title: "자료 검토",
    description: "거래 내역 및 관련 자료를 검토하여 법적 대응 가능성을 판단합니다.",
  },
  {
    step: 3,
    title: "소송 진행",
    description: "형사 고소 또는 민사 소송 절차가 진행됩니다.",
  },
  {
    step: 4,
    title: "피해 회복",
    description: "판결 또는 합의를 통해 피해금 회복 절차가 진행됩니다.",
  },
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">단체소송 진행 절차</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.step}
              className="rounded-xl bg-white p-8 shadow-lg border-l-4 border-blue-600"
            >
              <div className="text-sm font-bold text-blue-600 mb-2">STEP {s.step}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
