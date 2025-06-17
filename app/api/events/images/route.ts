import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UploadEventImagesResponse, EventImageType } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 上傳活動圖片的 API 路由處理函式
 * 需登入並擁有活動主辦權限。可上傳最多 3 張封面圖或詳情圖，僅支援 JPG。
 * 修改：將 eventId 從 URL 參數改為請求體參數，避免 Vercel 部署問題
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<UploadEventImagesResponse | ErrorResponse>> {
  console.log("🚀 [POST /api/events/images] API 路由開始執行");
  console.log("🔍 請求方法:", req.method);
  console.log("🔍 請求 URL:", req.url);

  try {
    console.log("📥 開始處理請求...");
    
    // 檢查用戶是否已登入
    console.log("🔐 檢查用戶登入狀態...");
    const accessToken = req.headers.get("access_token");
    console.log("🔑 Access Token 存在:", !!accessToken);
    console.log("🔑 Access Token 長度:", accessToken ? accessToken.length : 0);
    
    if (!accessToken) {
      console.log("❌ 用戶未登入，返回 401 錯誤");
      return NextResponse.json<ErrorResponse>(
        { status: "error", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 獲取查詢參數中的圖片類型
    console.log("🔍 解析查詢參數...");
    const url = new URL(req.url);
    const type = url.searchParams.get("type") as EventImageType;
    console.log("🖼️ 圖片類型:", type);
    
    // 檢查圖片類型是否合法
    if (!type || (type !== "cover" && type !== "detail")) {
      console.log("❌ 無效的圖片類型，返回 400 錯誤");
      return NextResponse.json<ErrorResponse>(
        { status: "error", message: "請提供有效的圖片類型 (cover 或 detail)" },
        { status: 400 }
      );
    }

    try {
      console.log("📋 開始解析表單資料...");
      // 獲取表單資料
      const formData = await req.formData();
      const files = formData.getAll("file");
      const eventId = formData.get("eventId") as string;
      
      console.log("🎯 活動 ID:", eventId);
      console.log("📁 上傳檔案數量:", files.length);
      
      // 安全地記錄檔案資訊，避免在伺服器端使用 File instanceof 檢查
      files.forEach((file, index) => {
        console.log(`📁 檔案 ${index + 1}:`, {
          hasName: 'name' in (file as object),
          hasSize: 'size' in (file as object),
          hasType: 'type' in (file as object),
          constructor: file.constructor.name
        });
      });

      // 檢查活動 ID 是否存在
      if (!eventId) {
        console.log("❌ 活動 ID 不存在，返回 400 錯誤");
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "請提供活動 ID" },
          { status: 400 }
        );
      }
      
      // 檢查是否有上傳檔案
      if (!files || files.length === 0) {
        console.log("❌ 沒有上傳檔案，返回 400 錯誤");
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "請至少上傳一張圖片" },
          { status: 400 }
        );
      }
      
      // 檢查檔案數量是否符合限制
      if (files.length > 3) {
        console.log("❌ 檔案數量超過限制，返回 400 錯誤");
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "最多只能上傳 3 張圖片" },
          { status: 400 }
        );
      }

      console.log("🌐 準備呼叫後端 API...");
      console.log("🔗 API 端點:", `/events/${eventId}/images?type=${type}`);
      console.log("🍪 Cookie 設定:", `access_token=${accessToken.substring(0, 10)}...`);
      
      try {
        console.log("📡 發送 POST 請求到後端...");
        // 將表單資料發送到後端 API
        const response = await axiosInstance.post<UploadEventImagesResponse>(
          `/events/${eventId}/images?type=${type}`,
          formData,
          {
            headers: {
              Cookie: `access_token=${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        console.log("✅ 後端 API 呼叫成功");
        console.log("📊 回應狀態:", response.status);
        console.log("📄 回應資料:", JSON.stringify(response.data, null, 2));
        
        // 返回成功回應
        console.log("🎉 準備返回成功回應");
        return NextResponse.json<UploadEventImagesResponse>(response.data, { status: 201 });
        
      } catch (error: unknown) {
        console.log("❌ 後端 API 呼叫失敗");
        console.error("🐛 API 錯誤詳情:", error);
        
        // 處理 Axios 錯誤
        const apiErr = formatAxiosError(error);
        console.log("🔍 格式化後的錯誤:", JSON.stringify(apiErr, null, 2));
        
        // 依據不同錯誤代碼回傳不同錯誤訊息
        if (apiErr.httpCode === 400) {
          console.log("⚠️ 返回 400 錯誤:", apiErr.message);
          return NextResponse.json<ErrorResponse>(
            { status: "error", message: apiErr.message || "請檢查上傳的檔案格式或內容" },
            { status: 400 }
          );
        } else if (apiErr.httpCode === 401) {
          console.log("⚠️ 返回 401 錯誤: 請先登入會員");
          return NextResponse.json<ErrorResponse>(
            { status: "error", message: "請先登入會員" },
            { status: 401 }
          );
        } else if (apiErr.httpCode === 403) {
          console.log("⚠️ 返回 403 錯誤: 尚未建立主辦方資料");
          return NextResponse.json<ErrorResponse>(
            { status: "error", message: "尚未建立主辦方資料" },
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
    } catch (parseError) {
      console.error("❌ 表單資料解析失敗:", parseError);
      return NextResponse.json<ErrorResponse>(
        { status: "error", message: "表單資料格式錯誤" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("💥 處理活動圖片上傳時發生嚴重錯誤:", error);
    console.error("🚨 錯誤堆疊:", error instanceof Error ? error.stack : "無堆疊資訊");
    
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
