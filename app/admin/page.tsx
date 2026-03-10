"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CaseItem = { id: string; slug: string; title: string };

export default function AdminPage() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  function fetchCases() {
    fetch("/api/cases", { cache: "no-store" })
      .then((r) => r.json())
      .then((list: { id?: string; slug?: string; title?: string }[]) => {
        const items = (list || [])
          .filter((c) => c?.id && c?.slug)
          .map((c) => ({ id: c.id!, slug: c.slug!, title: c.title || c.slug || "-" }));
        setCases(items);
      })
      .catch(() => setCases([]));
  }

  useEffect(() => {
    fetchCases();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("정말 이 사건을 삭제하시겠습니까?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/cases?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setMessage({ type: "err", text: data.error || "삭제 실패" });
        return;
      }
      setMessage({ type: "ok", text: "삭제되었습니다." });
      fetchCases();
      router.refresh();
    } catch {
      setMessage({ type: "err", text: "오류가 발생했습니다." });
    } finally {
      setDeletingId(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword.trim() }),
      });
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        setMessage({ type: "err", text: res.statusText || "저장 실패" });
        return;
      }
      if (!res.ok) {
        setMessage({ type: "err", text: data.error || "저장 실패" });
        return;
      }
      setMessage({ type: "ok", text: "사건이 등록되었습니다." });
      setKeyword("");
      fetchCases();
      router.refresh();
      router.push("/cases");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "오류가 발생했습니다.";
      setMessage({ type: "err", text: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/cases" className="text-blue-600 hover:underline">
            ← 홈으로
          </Link>
          <h1 className="text-lg font-bold text-slate-800">관리자 - 사건 등록</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl bg-white p-6 shadow">
          {message && (
            <p className={message.type === "ok" ? "text-green-600" : "text-red-600"}>
              {message.text}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              키워드
            </label>
            <input
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="예: 루나, FTX, 전세사기"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
              required
              autoFocus
            />
            <p className="mt-1 text-xs text-slate-500">
              키워드만 입력하면 title, description, content 등이 자동 생성됩니다.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "저장 중..." : "사건 등록"}
          </button>
        </form>

        <section className="mt-10 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-bold text-slate-800">등록된 사건</h2>
          {cases.length === 0 ? (
            <p className="text-slate-500 text-sm">등록된 사건이 없습니다.</p>
          ) : (
            <ul className="space-y-3">
              {cases.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 px-4 py-3"
                >
                  <div>
                    <span className="font-medium text-slate-800">{c.title}</span>
                    <span className="ml-2 text-slate-500 text-sm">{c.slug}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === c.id ? "삭제 중..." : "삭제"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
