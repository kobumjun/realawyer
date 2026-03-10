import { NextRequest, NextResponse } from "next/server";
import { getCases, addCaseFromKeyword } from "@/lib/cases";
import { getAuthFromCookie } from "@/lib/auth";

export async function GET() {
  const cases = getCases();
  return NextResponse.json(cases);
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

  const newCase = addCaseFromKeyword(keyword.trim());

  return NextResponse.json(newCase);
}
