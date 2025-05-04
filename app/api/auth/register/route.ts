import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UserRegister, UserRegisterResponse } from "@/types/api/auth/index";
import { ErrorResponse } from "@/types/api/response";

export async function POST(
  req: NextRequest
): Promise<NextResponse<UserRegisterResponse | ErrorResponse>> {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    // 取出body參數
    const body:UserRegister = await req.json();

    const backEndRes = await axiosInstance.post<UserRegisterResponse>(
      "/auth/register",
      body,
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      }
    );

    // response data
    const res = NextResponse.json<UserRegisterResponse>({
      message: backEndRes.data.message,
      status: backEndRes.data.status
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
