import { NextResponse } from "next/server";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";

export async function GET() {
  try {
const googleOAuthUrl = "https://everforest-backend.zeabur.app/api/v1/auth/oauth/google";

  // ✅ 直接讓瀏覽器跳轉
  return NextResponse.redirect(googleOAuthUrl, 302);
  } catch(err:unknown) {
    const apiErr = formatAxiosError(err);
    console.warn("err", err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status,
        message: apiErr.message,
      },
      { status: apiErr.httpCode }
    );
  }

}