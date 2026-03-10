"use client";

import { useState } from "react";

export default function CTASection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiry, setInquiry] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: wire to lawyer phone / Kakao / inquiry action later
    alert("상담 문의가 접수되었습니다. 담당자가 연락드리겠습니다.");
    setName("");
    setPhone("");
    setInquiry("");
  }

  return (
    <section className="rounded-2xl border border-blue-100 bg-blue-50/50 px-8 py-10 sm:px-12 sm:py-14">
      <h2 className="text-xl font-bold text-slate-800">
        무료 법률 상담 신청
      </h2>
      <p className="mt-2 text-slate-600">
        피해 상황을 간단히 적어주시면 전문 담당자가 검토 후 연락드립니다.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="cta-name" className="block text-sm font-medium text-slate-700 mb-1.5">
            이름
          </label>
          <input
            id="cta-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="성함"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cta-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
            전화번호
          </label>
          <input
            id="cta-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-0000-0000"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cta-inquiry" className="block text-sm font-medium text-slate-700 mb-1.5">
            문의 내용 / 피해 내용
          </label>
          <textarea
            id="cta-inquiry"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            placeholder="피해 상황을 간단히 적어주세요"
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-md hover:bg-blue-700 transition"
        >
          상담 신청하기
        </button>
      </form>
    </section>
  );
}
