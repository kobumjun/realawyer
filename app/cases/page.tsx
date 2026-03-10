"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import HeroSection from "@/components/ui/HeroSection";

export default function CasesPage() {
  const [cases, setCases] = useState<
    { slug?: string; title: string; description: string }[]
  >([]);

  useEffect(() => {
    fetch(`/api/cases?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setCases)
      .catch(console.error);
  }, []);

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cases
            .filter((c) => c?.slug)
            .map((c) => (
              <article
                key={c.slug}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-100 hover:shadow-md"
              >
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-700">
                  {c.title}
                </h3>
                <p className="mt-3 flex-1 text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {c.description}
                </p>
                <Link
                  href={`/case/${c.slug}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  사건상세보기
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
        </div>
      </div>
    </>
  );
}
