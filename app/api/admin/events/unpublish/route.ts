// app/api/admin/event/:id/unpublish/review 審核方審核下架
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { AxiosResponse } from "axios";
import { formatAxiosError } from "@/utils/errors";
import { PatchAdminUnpublishEventSuccessResponse, PatchUnpublishEventBody } from "@/types/api/admin"
import { ErrorResponse } from "@/types/api/response";

/** admin 依據event id 退回活動申請 */
export async function PATCH(
  req: NextRequest,
): Promise<NextResponse<PatchAdminUnpublishEventSuccessResponse | ErrorResponse>> {

  /* 1. 取 access_token（可改成 Authorization Bearer） */
  const token =
    req.cookies.get("access_token")?.value ?? req.headers.get("access_token");
  if (!token) {
    return NextResponse.json(
      { status: "error", message: "請重新登入" },
      { status: 401 }
    );
  }

  const { isApprove, comment: originalComment, eventId }: PatchUnpublishEventBody = await req.json();
  let comment = originalComment;
  if (isApprove && !comment) {
    comment = '理由合理，已同意下架'
  } 
  else if (!isApprove && !comment) {
    comment = '理由不合理，不同意下架'
  }
  if (!eventId) {
    return NextResponse.json(
      { status: "error", message: "缺少活動id" },
      { status: 401 }
    );
  }

  try {
    /* 2. 轉呼後端 API */
    const res: AxiosResponse<PatchAdminUnpublishEventSuccessResponse> = await axiosInstance.patch(
      `/admin/events/${eventId}/unpublish-review`,
      {isApprove, comment},
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