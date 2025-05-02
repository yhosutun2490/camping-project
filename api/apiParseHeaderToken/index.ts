import type { NextRequest } from "next/server";

export default function apiParseHeaderToken(
  req: NextRequest
): string | undefined {
  // 1. 直接从 header 拿到 middleware 注入的新 cookie
  const cookieHeader = req.headers.get("cookie") || "";

  // 2. 解析出刚刷新过的 access_token
  const accessToken = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("access_token="))
    ?.split("=")[1];
  return accessToken;
}
