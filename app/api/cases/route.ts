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
  const body = await request.json();
  const { keyword } = body;

  if (!keyword || typeof keyword !== "string") {
    return NextResponse.json({ error: "keyword required" }, { status: 400 });
  }

  const newCase = await addCaseFromKeyword(keyword.trim());

  return NextResponse.json(newCase);
}
