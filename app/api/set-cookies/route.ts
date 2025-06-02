import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const accessToken = url.searchParams.get("access_token");
  const refreshToken = url.searchParams.get("refresh_token");

  // 有任一缺失 → 導回登入頁不寫入
  if (!accessToken || !refreshToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const res = NextResponse.redirect(new URL("/", req.url));

  // ✅ 正常寫入 cookie
  res.headers.append("Set-Cookie", decodeURIComponent(accessToken));
  res.headers.append("Set-Cookie", decodeURIComponent(refreshToken));

  return res;
}