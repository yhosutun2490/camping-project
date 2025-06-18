import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { CreateEventPlansRequest, CreateEventPlansResponse } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 建立活動方案的 API 路由處理函式
 * 需登入並擁有活動主辦權限，用來為指定活動建立方案
 * 修改：將 eventId 從 URL 參數改為請求體參數，避免 Vercel 部署問題
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateEventPlansResponse | ErrorResponse>> {
  console.log("🚀 [POST /api/events/plans] API 路由開始執行");
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
    let requestBody: CreateEventPlansRequest & { eventId: string };
    
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

    const { eventId, ...plansData } = requestBody;
    console.log("🎯 活動 ID:", eventId);
    console.log("📝 方案資料:", JSON.stringify(plansData, null, 2));
  
    // 檢查活動 ID 是否存在
    if (!eventId) {
      console.log("❌ 活動 ID 不存在，返回 400 錯誤");
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或方案資料" },
        { status: 400 }
      );
    }
    
    // 檢查方案資料是否存在
    if (!plansData || !plansData.plans || plansData.plans.length === 0) {
      console.log("❌ 方案資料不存在，返回 400 錯誤");
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或方案資料" },
        { status: 400 }
      );
    }

    // 檢查方案數量限制（最多三個）
    if (plansData.plans.length > 3) {
      console.log("❌ 方案數量超過限制，返回 400 錯誤");
      console.log("📊 方案數量:", plansData.plans.length);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "最多只能建立三個活動方案" },
        { status: 400 }
      );
    }

    console.log("🌐 準備呼叫後端 API...");
    console.log("🔗 API 端點:", `/events/${eventId}/plans`);
    console.log("🍪 Cookie 設定:", `access_token=${accessToken.substring(0, 10)}...`);

    try {
      console.log("📡 發送 POST 請求到後端...");
      // 調用後端 API
      const response = await axiosInstance.post<CreateEventPlansResponse>(
        `/events/${eventId}/plans`,
        plansData,
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
      return NextResponse.json<CreateEventPlansResponse>(response.data, { status: 201 });
      
    } catch (error: unknown) {
      console.log("❌ 後端 API 呼叫失敗");
      console.error("🐛 API 錯誤詳情:", error);
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);
      console.log("🔍 格式化後的錯誤:", JSON.stringify(apiErr, null, 2));

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        console.log("⚠️ 返回 400 錯誤: 缺少活動 ID 或方案資料");
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "缺少活動 ID 或方案資料" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 401) {
        console.log("⚠️ 返回 401 錯誤: 請先登入會員");
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "請先登入會員" },
          { status: 401 }
        );
      } else if (apiErr.httpCode === 403) {
        console.log("⚠️ 返回 403 錯誤: 權限相關問題");
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: apiErr.message.includes("主辦方") ? "尚未建立主辦方資料" : "無權限建立此活動的方案" },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 404) {
        console.log("⚠️ 返回 404 錯誤: 找不到對應的活動");
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "找不到對應的活動" },
          { status: 404 }
        );
      } else {
        console.log("⚠️ 返回其他 API 錯誤:", apiErr.httpCode, apiErr.message);
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "伺服器錯誤，請稍後再試" },
          { status: 500 }
        );
      }
    }
  } catch (error: unknown) {
    console.error("💥 處理活動方案建立時發生嚴重錯誤:", error);
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    // 處理 JSON 解析錯誤或其他未預期錯誤
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
