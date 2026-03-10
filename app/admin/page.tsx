"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "err", text: data.error || "저장 실패" });
        return;
      }
      setMessage({ type: "ok", text: "사건이 등록되었습니다." });
      setKeyword("");
      router.push("/");
      router.refresh();
    } catch {
      setMessage({ type: "err", text: "오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b bg-white px-4 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link href="/" className="text-blue-600 hover:underline">
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
      </main>
    </div>
  );
}
