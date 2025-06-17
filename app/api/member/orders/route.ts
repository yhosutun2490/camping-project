import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import axiosInstance from "@/api/axiosIntance";
import {
  GetMemberOrdersResponse,
  PostMemberOrderRequest,
  PostMemberOrderResponse,
} from "@/types/api/member/orders";
import {
  DeleteMemberOrderRequest,
  DeleteMemberOrderResponse,
  PatchMemberOrderRequest,
  PatchMemberOrderResponse,
} from "@/types/api/member/orders";
import { ErrorResponse } from "@/types/api/response";
import { AxiosResponse } from "axios";

export type OrderStatus = "Unpaid" | "Paid" | "Refund"; // ← 和後端保持一致

// member order GET 取得個人訂單資料
export async function GET(
  req: NextRequest
): Promise<NextResponse<GetMemberOrdersResponse | ErrorResponse>> {
  // 新增訂單狀態
  const status =
    (req.nextUrl.searchParams.get("status") as OrderStatus | null) ?? "Unpaid";

  const accessToken = req.headers.get("access_token");
  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }
  try {
    const res: AxiosResponse<GetMemberOrdersResponse> = await axiosInstance.get(
      `/member/orders/status/${status}`,
      {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      }
    );
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

// member order POST 新增個人訂單資料
export async function POST(
  req: NextRequest
): Promise<NextResponse<PostMemberOrderResponse | ErrorResponse>> {
  const accessToken = req.headers.get("access_token");
  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }
  try {
    const body: PostMemberOrderRequest = await req.json();
    const res: AxiosResponse<PostMemberOrderResponse> =
      await axiosInstance.post("/member/orders", body, {
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
 
  const body = await req.json() as PatchMemberOrderRequest;
  const { orderId, ...updateOrder } = body

  if (!orderId) {
    return NextResponse.json(
      { status: "error", message: "缺少訂單 ID" },
      { status: 400 }
    );
  }

  try {
    const res: AxiosResponse<PatchMemberOrderResponse> =
      await axiosInstance.patch(`/member/orders/${orderId}`, updateOrder, {
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
  // const pathname = req.nextUrl.pathname;
  // const id = pathname.split("/").pop(); // 取得最後一段，訂單 id
  const body: DeleteMemberOrderRequest = await req.json();
  const { orderId } = body;

  if (!orderId) {
    return NextResponse.json(
      { status: "error", message: "缺少訂單 ID" },
      { status: 400 }
    );
  }

  try {
    const res: AxiosResponse<DeleteMemberOrderResponse> =
      await axiosInstance.delete(`/member/orders/${orderId}`, {
        data:body,
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
