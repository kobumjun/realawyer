import Link from "next/link";
import type { Case } from "@/lib/types";

interface CaseCardProps {
  case: Case;
}

export default function CaseCard({ case: caseData }: CaseCardProps) {
  const phone = caseData.phone || "1588-0000";

  return (
    <article className="rounded-xl bg-white p-6 shadow-lg transition hover:shadow-xl flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="inline-flex items-center rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
          NEW
        </span>
        <span className="text-xs text-slate-500">{caseData.status}</span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
        {caseData.title}
      </h3>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
        {caseData.description}
      </p>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
          24시간
        </span>
        <span className="text-sm font-medium text-slate-700">{phone}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <a
          href={`tel:${phone.replace(/-/g, "")}`}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          24시간 전화상담
        </a>
        <Link
          href={`/case/${caseData.slug}`}
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          사건상세보기
        </Link>
      </div>
    </article>
  );
}
