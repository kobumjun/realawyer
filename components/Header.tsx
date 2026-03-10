import Link from "next/link";

const PHONE = "1588-0000";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-slate-800">
          SEDAM Attorneys at Law
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/about"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            로펌소개
          </Link>
          <Link
            href="/cases"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            진행사건
          </Link>
          <Link
            href="/process"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            소송접수안내
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
          >
            고객센터
          </Link>
        </nav>

        <a
          href={`tel:${PHONE.replace(/-/g, "")}`}
          className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
        >
          <span className="text-sm md:text-base">{PHONE}</span>
        </a>
      </div>
    </header>
  );
}
