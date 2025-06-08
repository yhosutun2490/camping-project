import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import {
  GetMemberOrdersResponse,
  PostMemberOrderRequest,
  PostMemberOrderResponse
} from "@/types/api/member/orders"
import { ErrorResponse } from "@/types/api/response";
import axiosInstance from "@/api/axiosIntance";
import { AxiosResponse } from "axios";

// member order GET 取得個人訂單資料
export async function GET(
  req: NextRequest
): Promise<NextResponse<GetMemberOrdersResponse | ErrorResponse>> {

  const accessToken = req.headers.get("access_token");
  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }
  try {
    const res: AxiosResponse<GetMemberOrdersResponse> = await axiosInstance.get('/member/orders', {
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
    const res: AxiosResponse<PostMemberOrderResponse> = await axiosInstance.post('/member/orders', body, {
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
