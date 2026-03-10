import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import { getCases } from "@/lib/cases";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "법률 상담 신청 | SEDAM 법률사무소",
  description: "금융사기 피해 관련 상담 접수. 전문 담당자 검토 후 연락드립니다.",
};

export default function ContactPage() {
  const cases = getCases();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold text-white">법률 상담 신청</h1>
          <p className="mt-4 text-blue-100">
            금융사기 피해 관련 상담을 접수하시면 전문 담당자가 검토 후 연락드립니다.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <ContactForm cases={cases} />
      </div>
    </div>
  );
}
