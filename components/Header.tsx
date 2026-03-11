"use client";

import Link from "next/link";
import { useState } from "react";

const PHONE = "1588-0000";

const NAV_LINKS = [
  { href: "/cases", label: "로펌소개" },
  { href: "/cases", label: "진행사건" },
  { href: "/process", label: "소송접수안내" },
  { href: "/contact", label: "고객센터" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/cases" className="text-lg font-bold text-slate-800">
          법무법인 신결
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            <span className="text-sm md:text-base">{PHONE}</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 -mr-2 text-slate-600 hover:text-slate-800"
            aria-label="메뉴"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                {label}
              </Link>
            ))}
            <a
              href={`tel:${PHONE.replace(/-/g, "")}`}
              className="block py-3 text-sm font-semibold text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              {PHONE}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
