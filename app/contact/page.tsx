import Header from "@/components/Header";
import HeroSection from "@/components/ui/HeroSection";
import ContactForm from "@/components/ContactForm";
import { getCases } from "@/lib/cases";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "고객센터 | 법무법인 신결",
  description: "금융사기 피해 관련 상담 접수. 전문 담당자 검토 후 연락드립니다.",
};

function ContactInfoCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="font-medium text-blue-600 hover:underline">
      {value}
    </a>
  ) : (
    <span className="text-slate-800">{value}</span>
  );
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <dt className="text-sm font-semibold uppercase tracking-wider text-blue-700">
        {label}
      </dt>
      <dd className="mt-2">{content}</dd>
    </div>
  );
}

export default async function ContactPage() {
  const cases = await getCases();

  const phone = process.env.NEXT_PUBLIC_LAWYER_PHONE ?? "1588-0000";
  const kakaoChannel = process.env.NEXT_PUBLIC_KAKAO_CHANNEL ?? "#";
  const hours = "평일 09:00–18:00";
  const address = "서울시 영업중 · 상담 예약 후 방문 안내";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection
        title="고객센터"
        subtitle="금융사기 피해 상담 및 법률 문의"
        supportingLine="전문 담당자 검토 후 연락드립니다."
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-slate-800">연락처 안내</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <ContactInfoCard
              label="상담 전화"
              value={phone}
              href={`tel:${phone.replace(/-/g, "")}`}
            />
            <ContactInfoCard
              label="카카오톡 상담"
              value={kakaoChannel && kakaoChannel !== "#" ? "상담 채널 바로가기" : "준비 중"}
              href={kakaoChannel && kakaoChannel !== "#" ? kakaoChannel : undefined}
            />
            <ContactInfoCard label="상담 가능 시간" value={hours} />
            <ContactInfoCard label="사무소 주소" value={address} />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-slate-800">법률 상담 신청</h2>
          <p className="mb-6 text-slate-600">
            아래 양식을 작성해 주시면 사건별 담당자가 검토 후 연락드립니다.
          </p>
          <ContactForm cases={cases} />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">법적 고지</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            본 페이지의 상담 접수는 법률 자문의뢰 또는 변호사 선임 계약이 아니며,
            상담 내용 검토 후 별도 절차를 통해 진행됩니다. 개인정보는 상담 목적으로만 사용되며,
            관련 법령에 따라 보관·폐기됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
