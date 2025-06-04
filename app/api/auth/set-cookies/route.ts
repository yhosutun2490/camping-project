import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { accessToken, refreshToken } = await req.json();

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("access_token", accessToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none", 
    maxAge: 60 * 15, // 15 分鐘
  });

  response.cookies.set("refresh_token", refreshToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7, // 7 天
  });

  return response;
}