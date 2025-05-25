import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import type {
PostAuthForgotPasswordBody,
PostAuthForgotPassword200
} from "@/types/services/Auth/index";
import { ErrorResponse } from "@/types/api/response";

export async function POST(
  req: NextRequest
): Promise<NextResponse<PostAuthForgotPassword200 | ErrorResponse>> {
  try {

    // 取出body參數
    const body: PostAuthForgotPasswordBody = await req.json();
    // proxy to api
    const backEndRes = await axiosInstance.post<PostAuthForgotPassword200>(
      "/auth/forgot-password",
      body
    );
    // response data
    const res = NextResponse.json<PostAuthForgotPassword200>({
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
