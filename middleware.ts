import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api/v1";

const excludeApiList = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/check",
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next(); // 統一回傳物件

  const { pathname } = request.nextUrl;

  if (excludeApiList.includes(pathname)) {
    return NextResponse.next();
  }

  // 取得目前token資訊
  const accessToken = request.cookies.get("access_token")?.value; // 過期token瀏覽器不會讓你夾帶
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) return NextResponse.redirect(new URL("/", request.url));

  // 過期就刷新
  if (!accessToken && refreshToken) {
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { cookie: `refresh_token=${refreshToken}` },
    });

    if (refreshRes.status !== 200) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // 如果成功，把所有的 cookie 一次設置好(cookies 字串處理)：
    const rawSetCookies = refreshRes.headers.get("set-cookie"); // fetch 原生headers物件需要用get提取cookies
    if (rawSetCookies) {
      // 如果只有一條，直接 append
      const cookies = Array.isArray(rawSetCookies)
        ? rawSetCookies
        : [rawSetCookies];
      for (const cookie of cookies) {
        response.headers.append("Set-Cookie", cookie);
      }
    }
  }

  // return 最終 response
  return response;
}

export const config = {
  matcher: [
    "/member/:path*",
    "/host/:path*",
    "/create-event/:path*",
    "/edit-event/:path*",
    "/api/:path",
  ],
};
