import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import {
  DeleteMemberOrderRequest,
  DeleteMemberOrderResponse,
  PatchMemberOrderRequest,
  PatchMemberOrderResponse
} from "@/types/api/member/orders"
import { ErrorResponse } from "@/types/api/response";
import axiosInstance from "@/api/axiosIntance";
import { AxiosResponse } from "axios";

// member order PATCH 修改個人單一訂單資料
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<PatchMemberOrderResponse | ErrorResponse>> {

  const accessToken = req.headers.get("access_token");
  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }
  const pathname = req.nextUrl.pathname; 
  const id = pathname.split("/").pop();  // 取得最後一段，訂單 id

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "缺少訂單 ID" },
      { status: 400 }
    );
  }

  try {
    const body: PatchMemberOrderRequest = await req.json();
    const res: AxiosResponse<PatchMemberOrderResponse> = await axiosInstance.patch(`/member/orders/${id}`, {
      data: body,
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

// member order DELETE 刪除個人單一訂單資料
export async function DELETE(
  req: NextRequest
): Promise<NextResponse<DeleteMemberOrderResponse | ErrorResponse>> {

  const accessToken = req.headers.get("access_token");
  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }
  const pathname = req.nextUrl.pathname; 
  const id = pathname.split("/").pop();  // 取得最後一段，訂單 id

  if (!id) {
    return NextResponse.json(
      { status: "error", message: "缺少訂單 ID" },
      { status: 400 }
    );
  }

  try {
    const body: DeleteMemberOrderRequest = await req.json();
    const res: AxiosResponse<DeleteMemberOrderResponse> = await axiosInstance.delete(`/member/orders/${id}`, {
      data: body,
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
