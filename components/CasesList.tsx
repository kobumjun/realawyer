"use client";

import { useState } from "react";
import Link from "next/link";

const PER_PAGE = 12;

type CaseItem = { slug: string; title: string; description: string };

export default function CasesList({ cases }: { cases: CaseItem[] }) {
  const [page, setPage] = useState(1);

  const filtered = cases.filter((c) => c?.slug);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const pageCases = filtered.slice(start, start + PER_PAGE);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageCases.map((c) => (
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

      {totalPages > 1 && (
        <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="페이지">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              className={`min-w-[2.25rem] rounded-lg px-3 py-1.5 text-sm font-medium ${
                p === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}
