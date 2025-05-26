import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api/v1";

const excludeApiList = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/check",
  "/api/auth/forgot-password",
  "/api/event",
  "/api/auth/oauth/google"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

 if (excludeApiList.some((prefix) => pathname.startsWith(prefix))) {
  return NextResponse.next(); // 動態路由也放行
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

      // 2. 複製原本的 request headers
      const newReqHeaders = new Headers(request.headers);

      // 3. 把所有 Set-Cookie 的「name=value」合併成一條 Cookie header
      const cookiePairs = cookies.map((raw) => raw.split(";")[0]);
      newReqHeaders.set("cookie", cookiePairs.join("; "));

      // 4. 直接把最新的 access_token 提煉出來
      const newAccessToken = cookiePairs
       .find((c) => c.startsWith("access_token="))
       ?.split("=")[1]

     // 並把它塞到 Authorization header（或自訂 header）
     if (newAccessToken) {
       newReqHeaders.set("access_token", newAccessToken)
     }
      
      // 5. next() 傳接給下一個api route 
      const response = NextResponse.next({
        request: { headers: newReqHeaders },
      });

      // 6. 把所有 Set-Cookie 傳給瀏覽器(最後後續api route請求完成時)
      for (const header of cookies) {
        response.headers.append("Set-Cookie", header);
      }
    
      return response;
    }
  }
  // 一般token未過期情況
  const newReqHeaders = new Headers(request.headers);
  newReqHeaders.set("access_token", accessToken || "");

  return NextResponse.next({
    request: {
      headers: newReqHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/member/:path*",
    "/host/:path*",
    "/create-event/:path*",
    "/edit-event/:path*",
    "/api/:path*",
  ],
};
