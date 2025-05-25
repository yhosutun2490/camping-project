import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import type {
  GetApiV1EventsParams,
  GetApiV1Events200Data,
} from "@/types/services/Event";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";

function getOptionalNumber(val: string | null): number | undefined {
  if (!val) return undefined;
  const parsed = Number(val);
  return isNaN(parsed) ? undefined : parsed;
}

/**
 * 公開取得所有活動列表資訊
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const apiParams: GetApiV1EventsParams = {
      location: searchParams.get("location") ?? undefined,
      people: searchParams.get("person")
        ? parseInt(searchParams.get("person")!, 10)
        : undefined,
      startTime: searchParams.get("from") ?? undefined,
      endTime: searchParams.get("to") ?? undefined,
      minPrice: getOptionalNumber(searchParams.get("minPrice")),
      maxPrice: getOptionalNumber(searchParams.get("maxPrice")),
      page: Number(searchParams.get("page")) ?? 1,
      per: Number(searchParams.get("per")) ?? 10,
      sort: searchParams.get("sort") as "asc" | "desc",
      // 其他 page/per/sort 也可以同理加上
    };
    // 清除undefine條件
    const cleanedParams = Object.fromEntries(
      Object.entries(apiParams).filter(([, value]) => value !== undefined)
    );
    console.log('cleanedParams',cleanedParams)
    const data = await axiosInstance.get<GetApiV1Events200Data>("/events", {
      params: cleanedParams,
    });

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
