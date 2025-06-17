
import { NextRequest, NextResponse } from "next/server";
/** POST /api/auth/set-cookies */
export async function POST(req: NextRequest) {
  /* ❶ 解析 JSON body —— 只能呼叫一次 */
  const { accessToken, refreshToken } = await req.json();

  if (!accessToken || !refreshToken) {
    return NextResponse.json({ error: "Missing tokens" }, { status: 400 });
  }
 
  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: true,
    sameSite: "none",          
    maxAge: 60 * 15,   // 15 分鐘
    path: "/",
  });

  res.cookies.set({
    name:  "refresh_token",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: "/",
  });

  return res;                 // ← 一定要 return 同一個物件
}