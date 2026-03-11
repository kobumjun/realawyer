import { NextRequest, NextResponse } from "next/server";
import { getCases, addCaseFromKeyword, deleteCaseById } from "@/lib/cases";
import { getAuthFromCookie } from "@/lib/auth";

export async function GET() {
  const cases = await getCases();
  return NextResponse.json(cases);
}

export async function DELETE(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  if (!getAuthFromCookie(cookieHeader)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }
  try {
    await deleteCaseById(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "삭제 실패" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  if (!getAuthFromCookie(cookieHeader)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: { keyword?: string; keywords?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const keywords: string[] = [];
  if (Array.isArray(body.keywords) && body.keywords.length > 0) {
    keywords.push(...body.keywords.filter((k): k is string => typeof k === "string").map((k) => k.trim()).filter(Boolean));
  } else if (body.keyword && typeof body.keyword === "string" && body.keyword.trim()) {
    keywords.push(body.keyword.trim());
  }

  if (keywords.length === 0) {
    return NextResponse.json({ error: "keyword or keywords required" }, { status: 400 });
  }

  const uniqueKeywords = Array.from(new Set(keywords));

  try {
    const created: unknown[] = [];
    for (const kw of uniqueKeywords) {
      const c = await addCaseFromKeyword(kw);
      created.push(c);
    }
    if (created.length === 1) {
      return NextResponse.json(created[0]);
    }
    return NextResponse.json({ created: created.length, cases: created });
  } catch (e) {
    const err = e as { message?: string; details?: string; hint?: string; code?: string };
    const message = err?.message ?? (e instanceof Error ? e.message : "저장 실패");
    const details = err?.details ?? err?.hint ?? "";
    console.error("[POST /api/cases] insert failed:", e);
    return NextResponse.json(
      { error: message, ...(details && { details }) },
      { status: 500 }
    );
  }
}
