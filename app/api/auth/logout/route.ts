import { NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UserLogoutResponse } from "@/types/api/auth/index";
import { ErrorResponse } from "@/types/api/response";

export async function POST(): Promise<
  NextResponse<UserLogoutResponse | ErrorResponse>
> {
  try {
    const backEndRes = await axiosInstance.post<UserLogoutResponse>(
      "/auth/logout"
    );

    // 從後端 response 拿 cookie
    const setCookies = backEndRes.headers["set-cookie"];

    // response data
    const res = NextResponse.json<UserLogoutResponse>({
      message: backEndRes.data.message,
      status: backEndRes.data.status,
    });

    // 手動轉發 cookies 將後端傳入的過期cookies寫入前端瀏覽器
    if (setCookies) {
      const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
      for (const cookie of cookieArray) {
        res.headers.append("Set-Cookie", cookie);
      }
    }
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
