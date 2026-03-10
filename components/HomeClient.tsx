"use client";

import { useState, useMemo } from "react";
import CaseCard from "@/components/CaseCard";
import type { Case } from "@/lib/types";

interface HomeClientProps {
  cases: Case[];
}

const TOTAL_CASES = 4620;

export default function HomeClient({ cases }: HomeClientProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return cases;
    const q = search.trim().toLowerCase();
    return cases.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.keywords && c.keywords.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q)
    );
  }, [cases, search]);

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            금융사기 단체소송 원클릭 접수센터
          </h1>
          <p className="mt-4 text-lg text-blue-100 sm:text-xl">
            각 사건별 단체소송, 소송위임에서 환부신청까지!
          </p>
          <div className="mt-8">
            <input
              type="search"
              placeholder="사건명·키워드 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xl mx-auto rounded-lg border-0 bg-white/95 px-4 py-3.5 text-slate-800 placeholder:text-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <p className="mt-4 text-sm text-blue-200">
            현재 {TOTAL_CASES.toLocaleString()}건의 사건이 접수·진행 중입니다
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <CaseCard key={c.id} case={c} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-white/80 py-12">검색 결과가 없습니다.</p>
          )}
        </div>
      </section>
    </>
  );
}
