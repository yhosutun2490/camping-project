// app/api/admin/event/:id/approve 審核方准許單一活動申請上架
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { AxiosResponse } from "axios";
import { formatAxiosError } from "@/utils/errors";
import { PatchAdminApproveEventSuccessResponse } from "@/types/api/admin"
import { ErrorResponse } from "@/types/api/response";

/** admin 依據event id 核准活動上架 */
export async function PATCH(
  req: NextRequest,
): Promise<NextResponse<PatchAdminApproveEventSuccessResponse | ErrorResponse>> {

  /* 1. 取 access_token（可改成 Authorization Bearer） */
  const token =
    req.cookies.get("access_token")?.value ?? req.headers.get("access_token");
  if (!token) {
    return NextResponse.json(
      { status: "error", message: "請重新登入" },
      { status: 401 }
    );
  }
  const { eventId } = await req.json();
  if (!eventId) {
    return NextResponse.json(
      { status: "error", message: "缺少活動id" },
      { status: 401 }
    );
  }

  try {
    /* 2. 轉呼後端 API */
    const res: AxiosResponse<PatchAdminApproveEventSuccessResponse> = await axiosInstance.patch(
      `/admin/events/${eventId}/approve`,
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