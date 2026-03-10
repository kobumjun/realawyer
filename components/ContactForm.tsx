"use client";

import { useState } from "react";
import type { Case } from "@/lib/types";

interface ContactFormProps {
  cases: Case[];
}

export default function ContactForm({ cases }: ContactFormProps) {
  const [form, setForm] = useState({
    caseSlug: "",
    name: "",
    phone: "",
    amount: "",
    inquiry: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("상담 신청이 접수되었습니다. 담당자가 연락드리겠습니다.");
    setForm({ caseSlug: "", name: "", phone: "", amount: "", inquiry: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-8 shadow-lg"
    >
      <div>
        <label htmlFor="caseSlug" className="block text-sm font-medium text-slate-700 mb-1">
          사건 선택
        </label>
        <select
          id="caseSlug"
          name="caseSlug"
          value={form.caseSlug}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
          required
        >
          <option value="">사건을 선택하세요</option>
          {cases.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          이름
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
          전화번호
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
          required
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
          피해 금액
        </label>
        <input
          id="amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="예: 500만원"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>

      <div>
        <label htmlFor="inquiry" className="block text-sm font-medium text-slate-700 mb-1">
          문의 내용
        </label>
        <textarea
          id="inquiry"
          name="inquiry"
          value={form.inquiry}
          onChange={handleChange}
          placeholder="피해 상황을 간단히 적어주세요"
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
      >
        소송 상담 신청
      </button>
    </form>
  );
}
