import { NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";
import type { GetApiV1MetaEventTags200Data} from "@/types/services/EventTags"
/**
 * 公開取得所有活動標籤
 */
export async function GET() {
  try {

    const data = await axiosInstance.get<GetApiV1MetaEventTags200Data>("/event-tags");

    return NextResponse.json({ code: 200, data });
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
