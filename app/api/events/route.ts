import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { CreateEventRequest, CreateEventResponse, GetEventsResponse } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 建立活動的 API 路由處理函式
 * 僅限已登入的主辦方使用，用來建立活動基本資料
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateEventResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析請求體
    const eventData: CreateEventRequest = await req.json();

    try {
      // 調用後端 API
      const response = await axiosInstance.post<CreateEventResponse>(
        "/events",
        eventData,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<CreateEventResponse>(response.data, { status: 201 });
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "尚未建立主辦方資料" },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 409) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "該活動已存在，請勿重複建立" },
          { status: 409 }
        );
      } else if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "請填寫必填欄位" },
          { status: 400 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("處理活動建立時發生錯誤:", error);
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}

/**
 * 獲取活動列表的 API 路由處理函式
 */
export async function GET(
  req: NextRequest
): Promise<NextResponse<GetEventsResponse | ErrorResponse>> {
  try {
    // 獲取查詢參數
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    
    // 設置查詢參數
    const params = new URLSearchParams();
    
    // 轉發所有查詢參數
    for (const [key, value] of searchParams.entries()) {
      params.append(key, value);
    }
    
    try {
      // 調用後端 API
      const response = await axiosInstance.get<GetEventsResponse>(
        `/events?${params.toString()}`
      );

      // 返回成功回應
      return NextResponse.json<GetEventsResponse>(response.data);
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 根據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "參數格式錯誤" },
          { status: 400 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("處理活動查詢時發生錯誤:", error);
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
