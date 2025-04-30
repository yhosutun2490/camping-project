import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api/v1"  // 部屬後端Api實際路徑

const excludeApiList = [
  "/api/auth/login",
  "/api/auth/register",
 "/api/auth/check",
]

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value

  const { pathname } = request.nextUrl;
  const isExcludedCheck = excludeApiList.includes(pathname)

  if (isExcludedCheck) NextResponse.next() // 直接排除驗證

  // 如果沒登入，就導回首頁（或 login）
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 有token 驗證時效性
  const verifyRes = await fetch(`${API_BASE}/auth/check`, {
    method: "GET",
    headers: {
      // 把 cookie 丟給後端
      cookie: `access_token=${accessToken}`,
    },
  });

  // token過期refresh

  if (verifyRes.status === 401) {
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: {
        cookie: `refresh_token=${refreshToken}`,
      },
    });
    // 刷新也失敗 ⇒ 導回登入
    if (refreshRes.status !== 200) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    // 刷新成功，取回token 並回應
    const newCookies = refreshRes.headers.get("set-cookie");
    const response = NextResponse.next(); // 繼續夾帶token進入其他分頁或Api
    if (newCookies) {
      // Edge Middleware 不支援 set-cookie 陣列寫法，只能直接複製整串
      response.headers.set("set-cookie", newCookies);
    }
    return response;
  }
  console.log('驗證token更新成功')
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/member/:path*",  
    "/host/:path*",
    "/create-event/:path*",
    "/edit-event/:path*",
  ],
 
};
