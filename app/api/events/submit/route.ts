import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/api/axiosIntance';
import type { SubmitEventRequest, SubmitEventResponse } from '@/types/api/events/submit';
import type { ErrorResponse } from '@/types/api/response';
import { formatAxiosError } from '@/utils/errors';

/**
 * 提交活動審核 API 路由處理器
 * 修改：將 eventId 從 URL 參數改為請求體參數，避免 Vercel 部署問題
 */
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<SubmitEventResponse | ErrorResponse>> {
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
    let requestBody: SubmitEventRequest;
    
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
    console.log("🎯 活動 ID:", eventId);

    // 檢查活動 ID 是否存在
    if (!eventId) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "活動 ID 不存在" },
        { status: 400 }
      );
    }

    try {
      // 調用後端 API
      const response = await axiosInstance.patch<SubmitEventResponse>(
        `/events/${eventId}/submit`,
        {},
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<SubmitEventResponse>(response.data);
      
    } catch (error: unknown) {
      console.error("🐛 API 錯誤詳情:", error);
      
      // 處理 API 錯誤
      const apiErr = formatAxiosError(error);
      console.log("🔍 格式化後的錯誤:", JSON.stringify(apiErr, null, 2));
      
      return NextResponse.json<ErrorResponse>(
        {
          status: apiErr.status,
          message: apiErr.message,
        },
        { status: apiErr.httpCode }
      );
    }
  } catch (error) {
    console.error("💥 處理活動提交審核時發生嚴重錯誤:", error);
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
