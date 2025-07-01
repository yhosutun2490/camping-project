// app/api/admin/event/:id/ai-check ai智能審核申請上架活動
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { AxiosResponse } from "axios";
import { formatAxiosError } from "@/utils/errors";
import { PostAiCheckSuccessResponse } from "@/types/api/admin"
import { ErrorResponse } from "@/types/api/response";

/** admin 依據event id ai智能審核申請上架活動 */
export async function POST(
  req: NextRequest,
): Promise<NextResponse<PostAiCheckSuccessResponse | ErrorResponse>> {

  /* 1. 取 access_token（可改成 Authorization Bearer） */
  const token =
    req.cookies.get("access_token")?.value ?? req.headers.get("access_token");
  if (!token) {
    return NextResponse.json(
      { status: "error", message: "請重新登入" },
      { status: 401 }
    );
  }

  const { eventId }:{eventId:string} = await req.json();

  if (!eventId) {
    return NextResponse.json(
      { status: "error", message: "缺少活動id" },
      { status: 401 }
    );
  }

  try {
    /* 2. 轉呼後端 API */
    const res: AxiosResponse<PostAiCheckSuccessResponse> = await axiosInstance.post(
      `/admin/events/${eventId}/ai-check`,
      null,
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