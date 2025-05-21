import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import type {
  GetEventsParams,
  EventListResponse,
} from "@/types/api/event/allEvents";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";

/**
 * 公開取得所有活動列表資訊
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const apiParams: GetEventsParams = {
      location: searchParams.get("location") ?? undefined,
      people: searchParams.get("person")
        ? parseInt(searchParams.get("person")!, 10)
        : undefined,
      startTime: searchParams.get("from") ?? undefined,
      endTime: searchParams.get("to") ?? undefined,
      minPrice:  Number(searchParams.get("min")) ?? undefined,
      maxPrice:  Number(searchParams.get("max")) ?? undefined,
      page:  Number(searchParams.get("page")) ?? 1,
      per:  Number(searchParams.get("per"))?? 10,
      sort: searchParams.get("sort") as "asc" | "desc"
      // 其他 page/per/sort 也可以同理加上
    };
    const data = await axiosInstance.get<EventListResponse>("/event", {
      params: apiParams,
    });

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
