import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import { ErrorResponse } from "@/types/api/response";
import axiosInstance from "@/api/axiosIntance";
import {
  PostPaymentRequest,
  PostPaymentResponse
} from "@/types/api/member/orders/payment";
import {AxiosResponse} from "axios"

// member order payment POST 新增訂單付款資料
export async function POST(
  req: NextRequest,
): Promise<NextResponse<PostPaymentResponse | ErrorResponse>> {

  const accessToken = req.headers.get("access_token");
  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }
  try {
    const body: PostPaymentRequest = await req.json();
    const res: AxiosResponse<PostPaymentResponse> = await axiosInstance.post('/member/orders/payment', body, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
      withCredentials: true,
    });
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    const apiErr = formatAxiosError(error);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status, // failed / error
        message: apiErr.message, // 錯誤訊息
      },
      { status: apiErr.httpCode } // HTTP 回傳碼
    );
  }
}
