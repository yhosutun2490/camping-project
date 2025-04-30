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
    return NextResponse.next() ;      
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
   response.cookies.set("x-refresh-test", "x-refresh-test");
  // 如果成功，把所有的 cookie 一次設置好(cookies 字串處理)：
  refreshRes.headers.forEach((rawValue, headerName) => {
    if (headerName.toLowerCase() !== "set-cookie") return;

    // rawValue 形如 "access_token=…; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=…"
    const parts = rawValue.split(";").map((s) => s.trim());
    const [namePart, ...rest] = parts;
    const [name, ...valParts] = namePart.split("=");
    const value = valParts.join("=");

    // 解析cookie字串屬性
    const opts: {
      path?: string;
      domain?: string;
      maxAge?: number;
      expires?: Date;
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "lax" | "strict" | "none";
    } = {};

    for (const attr of rest) {
      const [k, v] = attr.split("=");
      switch (k.toLowerCase()) {
        case "path":
          opts.path = v;
          break;
        case "domain":
          opts.domain = v;
          break;
        case "max-age":
          opts.maxAge = Number(v);
          break;
        case "expires":
          opts.expires = new Date(v);
          break;
        case "httponly":
          opts.httpOnly = true;
          break;
        case "secure":
          opts.secure = true;
          break;
        case "samesite":
          opts.sameSite = v.toLowerCase() as "lax" | "strict" | "none";;
          break;
      }
    }

    // 調用 NextResponse.cookies API
    response.cookies.set({
      name,
      value,
      ...opts,
    });
  });
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
  ],
};