import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UpdateEventNoticesTagsRequest, UpdateEventNoticesTagsResponse } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 更新活動行前提醒與標籤的 API 路由處理函式
 * 主辦方更新指定活動的行前提醒與標籤。若陣列為空則代表清除所有設定。
 * 修改：將 eventId 從 URL 參數改為請求體參數，避免 Vercel 部署問題
 */
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<UpdateEventNoticesTagsResponse | ErrorResponse>> {
  console.log("🚀 [PATCH /api/events/notices-tags] API 路由開始執行");
  console.log("🔍 請求方法:", req.method);
  console.log("🔍 請求 URL:", req.url);
  
  try {
    console.log("📥 開始解析請求體...");
    
    // 檢查用戶是否已登入
    console.log("🔐 檢查用戶登入狀態...");
    const accessToken = req.headers.get("access_token");
    console.log("🔑 Access Token 存在:", !!accessToken);
    console.log("🔑 Access Token 長度:", accessToken ? accessToken.length : 0);
    
    if (!accessToken) {
      console.log("❌ 用戶未登入，返回 401 錯誤");
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析請求體，包含 eventId
    let requestBody: UpdateEventNoticesTagsRequest & { eventId: string };
    
    try {
      requestBody = await req.json();
      console.log("✅ 請求體解析成功");
      console.log("📦 請求體內容:", JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error("❌ 請求體解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請求格式錯誤" },
        { status: 400 }
      );
    }

    const { eventId, ...updateData } = requestBody;
    console.log("🎯 活動 ID:", eventId);
    console.log("📝 更新資料:", JSON.stringify(updateData, null, 2));

    // 檢查活動 ID 是否存在
    if (!eventId) {
      console.log("❌ 活動 ID 不存在，返回 400 錯誤");
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "尚未建立活動" },
        { status: 400 }
      );
    }

    console.log("🌐 準備呼叫後端 API...");
    console.log("🔗 API 端點:", `/events/${eventId}/notices-tags`);
    console.log("🍪 Cookie 設定:", `access_token=${accessToken.substring(0, 10)}...`);

    try {
      // 調用後端 API
      console.log("📡 發送 PATCH 請求到後端...");
      const response = await axiosInstance.patch<UpdateEventNoticesTagsResponse>(
        `/events/${eventId}/notices-tags`,
        updateData,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log("✅ 後端 API 呼叫成功");
      console.log("📊 回應狀態:", response.status);
      console.log("📄 回應資料:", JSON.stringify(response.data, null, 2));

      // 返回成功回應
      console.log("🎉 準備返回成功回應");
      return NextResponse.json<UpdateEventNoticesTagsResponse>(response.data);
      
    } catch (error: unknown) {
      console.log("❌ 後端 API 呼叫失敗");
      console.error("🐛 API 錯誤詳情:", error);
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);
      console.log("🔍 格式化後的錯誤:", JSON.stringify(apiErr, null, 2));

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        console.log("⚠️ 返回 400 錯誤: 尚未建立活動");
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "尚未建立活動" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 403) {
        console.log("⚠️ 返回 403 錯誤: 尚未建立主辦方資料");
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "尚未建立主辦方資料" },
          { status: 403 }
        );
      } else {
        console.log("⚠️ 返回其他 API 錯誤:", apiErr.httpCode, apiErr.message);
        return NextResponse.json<ErrorResponse>(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("💥 處理活動行前提醒與標籤更新時發生嚴重錯誤:", error);
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
