"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function CasesPage() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetch("/api/cases")
      .then((r) => r.json())
      .then(setCases)
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "40px" }}>
      <h1>현재 진행 중인 주요 사건</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {cases.map((c: { slug: string; title: string; description: string }) => (
          <div
            key={c.slug}
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h3>{c.title}</h3>
            <p>{c.description}</p>

            <Link href={`/case/${c.slug}`}>사건상세보기</Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
