// app/api/member/orders/[orderId]/refund/route.ts 退款
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { AxiosResponse } from "axios";
import { formatAxiosError } from "@/utils/errors";
import { OrderRefundResponse } from "@/types/api/member/orders/refund"
import { ErrorResponse } from "@/types/api/response";

/** 依據訂單order id 取得QR code */
export async function POST(
  req: NextRequest,
): Promise<NextResponse<OrderRefundResponse | ErrorResponse>> {

  /* 1. 取 access_token（可改成 Authorization Bearer） */
  const token =
    req.cookies.get("access_token")?.value ?? req.headers.get("access_token");
  if (!token) {
    return NextResponse.json(
      { status: "error", message: "請重新登入" },
      { status: 401 }
    );
  }
  const { orderId } = await req.json();
  if (!orderId) {
    return NextResponse.json(
      { status: "error", message: "缺少訂單id" },
      { status: 401 }
    );
  }

  try {
    /* 2. 轉呼後端 API */
    const res: AxiosResponse<OrderRefundResponse> = await axiosInstance.post(
      `/member/orders/${orderId}/refund`,
      null, // 這支 API 只有路徑參數，沒 body
      {
        headers: { Cookie: `access_token=${token}` },
        withCredentials: true,
      }
    );

    /* 3. 成功回傳前端 */
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const apiErr = formatAxiosError(err);
    return NextResponse.json(
      { status: apiErr.status, message: apiErr.message },
      { status: apiErr.httpCode }
    );
  }
}