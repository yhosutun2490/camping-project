import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UserRefreshTokenResponse } from "@/types/api/auth/index";
import { ErrorResponse } from "@/types/api/response";

export async function POST(
  req: NextRequest
): Promise<NextResponse<UserRefreshTokenResponse | ErrorResponse>> {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    // 不須body參數，但須夾帶cookies
    const backEndRes = await axiosInstance.post<UserRefreshTokenResponse>(
      "/auth/refresh",
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      }
    );

    // response data
    const res = NextResponse.json<UserRefreshTokenResponse>({
      message: backEndRes.data.message,
      status: backEndRes.data.status,
    });

    return res;
  } catch (err: unknown) {
    const apiErr = formatAxiosError(err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status, // failed / error
        message: apiErr.message, // 錯誤訊息
      },
      { status: apiErr.httpCode } // HTTP 回傳碼
    );
  }
}
