import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import type { GetHostEventsResponse } from "@/types/api/host/events";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";

// 處理主辦方活動列表請求
export async function GET(
  request: NextRequest
): Promise<NextResponse<GetHostEventsResponse | ErrorResponse>> {
  try {
    // 檢查使用者是否已登入
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json(
        { status: "failed", message: "使用者未登入或權限不足" },
        { status: 401 }
      );
    }

    // 取得查詢參數
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    // 建構後端 API URL
    let apiUrl = "/host/events";
    if (tag && tag.trim() !== '') {
      apiUrl += `?tag=${encodeURIComponent(tag)}`;
    }

    try {
      // 調用後端 API
      const response = await axiosInstance.get<GetHostEventsResponse>(apiUrl, {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      });

      return NextResponse.json(response.data, { status: 200 });
    } catch (error: unknown) {
      // 處理 Axios 錯誤，使用格式化工具
      const apiErr = formatAxiosError(error);
      
      // 根據 HTTP 狀態碼返回對應的錯誤回應
      if (apiErr.httpCode === 401) {
        return NextResponse.json(
          { status: "failed", message: "使用者未登入或權限不足" },
          { status: 401 }
        );
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json(
          { status: "failed", message: "找不到對應的 event_id" },
          { status: 404 }
        );
      } else if (apiErr.httpCode === 400) {
        return NextResponse.json(
          { status: "failed", message: "發生錯誤" },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { status: "failed", message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("處理主辦方活動列表請求時發生錯誤:", error);
    return NextResponse.json(
      { status: "failed", message: "伺服器錯誤" },
      { status: 500 }
    );
  }
}
