import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  console.log("token from cookie:", token);

  // 如果沒登入，就導回首頁（或 login）
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

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
