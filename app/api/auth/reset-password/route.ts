import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import {
  PutAuthResetPasswordBody,
  PutAuthResetPassword200,
} from "@/types/services/Auth/index";
import { ErrorResponse } from "@/types/api/response";

export async function PUT(
  req: NextRequest
): Promise<NextResponse<PutAuthResetPassword200 | ErrorResponse>> {
  try {
    // access token
    const accessToken = req.headers.get("access_token");

    // 取出body參數
    const body: PutAuthResetPasswordBody = await req.json();

    // proxy to api
    const backEndRes = await axiosInstance.put<PutAuthResetPassword200>(
      "/auth/reset-password",
      body,
      {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      }
    );

    // response data
    const res = NextResponse.json<PutAuthResetPassword200>({
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
