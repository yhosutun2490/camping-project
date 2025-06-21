import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { CreateEventPlansRequest, CreateEventPlansResponse, UpdateEventPlansRequest, UpdateEventPlansResponse, DeleteEventPlanResponse } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 建立活動方案的 API 路由處理函式
 * 需登入並擁有活動主辦權限，用來為指定活動建立方案
 * 修改：將 eventId 從 URL 參數改為請求體參數，避免 Vercel 部署問題
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateEventPlansResponse | ErrorResponse>> {
  
  try {
    
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析請求體，包含 eventId
    let requestBody: CreateEventPlansRequest & { eventId: string };
    
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ 請求體解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請求格式錯誤" },
        { status: 400 }
      );
    }

    const { eventId, ...plansData } = requestBody;
  
    // 檢查活動 ID 是否存在
    if (!eventId) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或方案資料" },
        { status: 400 }
      );
    }
    
    // 檢查方案資料是否存在
    if (!plansData || !plansData.plans || plansData.plans.length === 0) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或方案資料" },
        { status: 400 }
      );
    }

    // 檢查方案數量限制（最多三個）
    if (plansData.plans.length > 3) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "最多只能建立三個活動方案" },
        { status: 400 }
      );
    }

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

      // 返回成功回應
      return NextResponse.json<CreateEventPlansResponse>(response.data, { status: 201 });
      
    } catch (error: unknown) {
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "缺少活動 ID 或方案資料" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 401) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "請先登入會員" },
          { status: 401 }
        );
      } else if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: apiErr.message.includes("主辦方") ? "尚未建立主辦方資料" : "無權限建立此活動的方案" },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "找不到對應的活動" },
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
    
    // 處理 JSON 解析錯誤或其他未預期錯誤
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}

/**
 * 更新活動方案的 API 路由處理函式
 * 需登入並擁有活動主辦權限，用來更新指定活動的方案
 * 支援新增、更新和刪除方案（透過 ID 判斷）
 */
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<UpdateEventPlansResponse | ErrorResponse>> {
  
  try {
    
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析請求體，包含 eventId
    let requestBody: UpdateEventPlansRequest & { eventId: string };
    
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ 請求體解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請求格式錯誤" },
        { status: 400 }
      );
    }

    const { eventId, ...plansData } = requestBody;
  
    // 檢查活動 ID 是否存在
    if (!eventId) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或 plans 為空" },
        { status: 400 }
      );
    }
    
    // 檢查方案資料是否存在
    if (!plansData || !plansData.plans || plansData.plans.length === 0) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或 plans 為空" },
        { status: 400 }
      );
    }

    // 檢查方案數量限制（最多三個）
    if (plansData.plans.length > 3) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "最多只能建立三個活動方案" },
        { status: 400 }
      );
    }

    try {
      console.log("📡 發送 PATCH 請求到後端...");
      // 調用後端 API
      const response = await axiosInstance.patch<UpdateEventPlansResponse>(
        `/events/${eventId}/plans`,
        plansData,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<UpdateEventPlansResponse>(response.data, { status: 200 });
      
    } catch (error: unknown) {
      console.error("🐛 API 錯誤詳情:", error);
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "缺少活動 ID 或 plans 為空" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "非該活動主辦方" },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "找不到活動 / 要更新的方案 ID 不存在" },
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
    console.error("💥 處理活動方案更新時發生嚴重錯誤:", error);
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    // 處理 JSON 解析錯誤或其他未預期錯誤
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}

/**
 * 刪除活動方案的 API 路由處理函式
 * 需登入並擁有活動主辦權限，用來刪除指定活動的特定方案
 */
export async function DELETE(
  req: NextRequest
): Promise<NextResponse<DeleteEventPlanResponse | ErrorResponse>> {
  
  try {
    
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析請求體，包含 eventId 和 planId
    let requestBody: { eventId: string; planId: string };
    
    try {
      requestBody = await req.json();
    } catch (parseError) {
      console.error("❌ 請求體解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "請求格式錯誤" },
        { status: 400 }
      );
    }

    const { eventId, planId } = requestBody;
  
    // 檢查活動 ID 和方案 ID 是否存在
    if (!eventId || !planId) {
      return NextResponse.json<ErrorResponse>(
        { status: "failed", message: "缺少活動 ID 或方案 ID" },
        { status: 400 }
      );
    }
    
    console.log("🗑️ 刪除活動方案請求 - 活動 ID:", eventId, "方案 ID:", planId);

    try {
      // 發送請求到後端 API，使用路徑參數
      const response = await axiosInstance.delete<DeleteEventPlanResponse>(
        `/events/${eventId}/plans/${planId}`,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      console.log("✅ 後端 API 回應:", response.data);

      // 返回成功回應
      return NextResponse.json<DeleteEventPlanResponse>(response.data, { status: 200 });
      
    } catch (error: unknown) {
      console.error("🐛 API 錯誤詳情:", error);
      
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "缺少活動 ID 或 plans 為空" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "非該活動主辦方" },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: apiErr.message.includes("eventId") ? "eventId 不存在" : "planId 錯誤或不屬於此活動" },
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
    console.error("💥 處理活動方案刪除時發生嚴重錯誤:", error);
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    // 處理 JSON 解析錯誤或其他未預期錯誤
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
