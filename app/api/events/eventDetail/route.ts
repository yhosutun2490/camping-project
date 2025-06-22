import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import type { GetHostEventDetailRequest, GetHostEventDetailResponse } from "@/types/api/host/eventDetail";
import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";

/**
 * 取得主辦方活動詳情的 API 路由處理函式
 * 需登入並擁有活動主辦權限，用於取得指定活動的完整詳情
 * 使用 POST 方法，將 eventId 放在請求體中，避免 Vercel 部署問題
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<GetHostEventDetailResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析請求體，獲取 eventId
    let requestBody: GetHostEventDetailRequest;
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ 請求體解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請求格式錯誤" },
        { status: 400 }
      );
    }

    const { eventId } = requestBody;

    // 檢查活動 ID 是否存在
    if (!eventId) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID" },
        { status: 400 }
      );
    }

    try {
      // 調用後端 API
      const response = await axiosInstance.get<GetHostEventDetailResponse>(
        `/events/${eventId}/host`,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<GetHostEventDetailResponse>(response.data, { status: 200 });
      
    } catch (error: unknown) {
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "缺少活動 ID" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "尚未建立主辦方資料" },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "找不到該活動" },
          { status: 404 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "伺服器錯誤，請稍後再試" },
          { status: 500 }
        );
      }
    }
  } catch (error: unknown) {
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
