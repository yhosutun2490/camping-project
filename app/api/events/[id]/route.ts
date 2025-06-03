import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import type { GetApiV1EventsEventIdResponse } from "@/types/api/event/eventById";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";

/**
 * 公開取得單一活動資訊
 */

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    // 根據 id 查詢資料
    const data = await axiosInstance.get<GetApiV1EventsEventIdResponse>(
      `/events/${id}`
    );

    return NextResponse.json({ code: 200, data: data.data });
  } catch (err: unknown) {
    const apiErr = formatAxiosError(err);
    console.warn("err", err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status,
        message: apiErr.message,
      },
      { status: apiErr.httpCode }
    );
  }
}
