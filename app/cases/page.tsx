"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function CasesPage() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch(`/api/cases?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then(setCases)
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">
          현재 진행 중인 주요 사건
        </h1>

        <div className="grid grid-cols-3 gap-6 mt-10">
          {cases
            .filter((c: { slug?: string }) => c?.slug)
            .map((c: { slug: string; title: string; description: string }) => (
              <div
                key={c.slug}
                className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {c.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {c.description}
                </p>
                <Link
                  href={`/case/${c.slug}`}
                  className="inline-block text-blue-600 font-medium hover:underline"
                >
                  사건상세보기 →
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
