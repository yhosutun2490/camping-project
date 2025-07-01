import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/api/axiosIntance';
import type { RequestUnpublishEventRequest, RequestUnpublishEventResponse } from '@/types/api/host/request-unpublish';
import type { ErrorResponse } from '@/types/api/response';
import { formatAxiosError } from '@/utils/errors';

/**
 * 申請下架活動 API 路由處理器
 * 修改：將 eventId 從 URL 參數改為請求體參數，避免 Vercel 部署問題
 */
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<RequestUnpublishEventResponse | ErrorResponse>> {
  
  try {
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "無此權限，請先登入" },
        { status: 403 }
      );
    }

    // 解析請求體，包含 eventId 和 reason
    let requestBody: RequestUnpublishEventRequest & { eventId: string };
    
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ 請求體解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請求格式錯誤" },
        { status: 400 }
      );
    }

    const { eventId, reason } = requestBody;

    // 檢查活動 ID 是否存在
    if (!eventId) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "活動 ID 不存在" },
        { status: 400 }
      );
    }

    // 檢查下架原因是否存在
    if (!reason || reason.trim() === "") {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請提供下架原因" },
        { status: 400 }
      );
    }

    try {
      // 調用後端 API，只傳送 reason 到後端
      const response = await axiosInstance.patch<RequestUnpublishEventResponse>(
        `/host/events/${eventId}/request-unpublish`,
        { reason },
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<RequestUnpublishEventResponse>(response.data);
      
    } catch (error: unknown) {
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "只有已上架活動可以申請下架" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 403) {
        // 檢查錯誤訊息來區分不同的 403 錯誤
        if (apiErr.message.includes("主辦方")) {
          return NextResponse.json<ErrorResponse>(
            { status: "failed", message: "無法取得主辦方資料" },
            { status: 403 }
          );
        } else {
          return NextResponse.json<ErrorResponse>(
            { status: "failed", message: "無此權限，請先登入" },
            { status: 403 }
          );
        }
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "找不到活動" },
          { status: 404 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "伺服器錯誤，請稍後再試" },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("💥 處理申請下架活動時發生嚴重錯誤:", error);
    
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
