import { NextRequest, NextResponse } from "next/server";
import { isPasswordValid } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  if (!password || typeof password !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!isPasswordValid(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("sedam_admin", "authenticated", {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: "lax",
  });
  return res;
}
