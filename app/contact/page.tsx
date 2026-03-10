import Header from "@/components/Header";
import HeroSection from "@/components/ui/HeroSection";
import ContactForm from "@/components/ContactForm";
import { getCases } from "@/lib/cases";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "고객센터 | 법무법인 신결",
  description: "금융사기 피해 관련 상담 접수. 전문 담당자 검토 후 연락드립니다.",
};

export default async function ContactPage() {
  const cases = await getCases();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection
        title="고객센터"
        subtitle="금융사기 피해 상담 및 법률 문의"
        supportingLine="전문 담당자 검토 후 연락드립니다."
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <section>
          <h2 className="mb-8 text-2xl font-bold text-slate-800">법률 상담 신청</h2>
          <p className="mb-6 text-slate-600">
            아래 양식을 작성해 주시면 사건별 담당자가 검토 후 연락드립니다.
          </p>
          <ContactForm cases={cases} />
        </section>
      </div>
    </div>
  );
}
