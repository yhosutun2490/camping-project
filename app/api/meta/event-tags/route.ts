import { NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { EventTagsResponse } from "@/types/api/meta";
import { ErrorResponse } from "@/types/api/response";

export async function GET(): Promise<
  NextResponse<EventTagsResponse | ErrorResponse>
> {
  try {
    const backEndRes = await axiosInstance.get<EventTagsResponse>(
      "/meta/event-tags"
    );

    // response data
    const res = NextResponse.json<EventTagsResponse>({
      status: "success",
      message: backEndRes.data.message || "取得所有活動標籤成功",
      data: backEndRes.data.data
    });

    return res;
  } catch (err: unknown) {
    const apiErr = formatAxiosError(err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status, // failed / error
        message: apiErr.message || "系統錯誤，請稍後再試"
      },
      { status: apiErr.httpCode || 500 } // HTTP 回傳碼
    );
  }
}
