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
  let body: { keyword?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const { keyword } = body;

  if (!keyword || typeof keyword !== "string") {
    return NextResponse.json({ error: "keyword required" }, { status: 400 });
  }

  try {
    const newCase = await addCaseFromKeyword(keyword.trim());
    return NextResponse.json(newCase);
  } catch (e) {
    const message = e instanceof Error ? e.message : "저장 실패";
    console.error("[POST /api/cases] insert failed:", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
