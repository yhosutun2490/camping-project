import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors"
import { UserLoginResponse } from "@/types/api/auth/index";
import { ErrorResponse } from "@/types/api/response"


export async function POST(
  req: NextRequest
): Promise<NextResponse<UserLoginResponse | ErrorResponse>> {
  try {
    // 取出body參數
    const body = await req.json();
    const backEndRes = await axiosInstance.post<UserLoginResponse>("/auth/login", body);

    // 從後端 response 拿 cookie
    const setCookies = backEndRes.headers["set-cookie"];

    // response data
    const res = NextResponse.json<UserLoginResponse>({
      message: backEndRes.data.message,
      data: backEndRes.data.data,
      status: backEndRes.data.status,
    });

    // 手動轉發 cookies
    if (setCookies) {
      const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
      for (const cookie of cookieArray) {
        res.headers.append("Set-Cookie", cookie);
      }
    }
    return res;
  } catch (err:unknown) {
    const apiErr = formatAxiosError(err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status,    // failed / error
        message: apiErr.message,  // 錯誤訊息
      },
      { status: apiErr.httpCode } // HTTP 回傳碼
    );
  }
}
