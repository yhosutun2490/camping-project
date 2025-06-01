import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UploadEventImagesResponse, EventImageType } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 上傳活動圖片的 API 路由處理函式
 * 需登入並擁有活動主辦權限。可上傳最多 3 張封面圖或詳情圖，僅支援 JPG。
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
): Promise<NextResponse<UploadEventImagesResponse | ErrorResponse>> {
  // 在 Next.js App Router 中，params 是一個 Promise，需要先 await
  const { eventId } = await params;
  
  // 檢查活動 ID 是否存在
  if (!eventId) {
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "請提供活動 ID" },
      { status: 400 }
    );
  }
  
  // 獲取查詢參數中的圖片類型
  const url = new URL(req.url);
  const type = url.searchParams.get("type") as EventImageType;
  
  // 檢查圖片類型是否合法
  if (!type || (type !== "cover" && type !== "detail")) {
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "請提供有效的圖片類型 (cover 或 detail)" },
      { status: 400 }
    );
  }
  
  try {
    // 檢查用戶是否已登入
    const accessToken = req.headers.get("access_token");
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: "error", message: "請先登入會員" },
        { status: 401 }
      );
    }
    
    try {
      // 獲取表單資料
      const formData = await req.formData();
      const files = formData.getAll("file");
      
      // 檢查是否有上傳檔案
      if (!files || files.length === 0) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "請至少上傳一張圖片" },
          { status: 400 }
        );
      }
      
      // 檢查檔案數量是否符合限制
      if (files.length > 3) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "最多只能上傳 3 張圖片" },
          { status: 400 }
        );
      }
      
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
      
      // 返回成功回應
      return NextResponse.json<UploadEventImagesResponse>(response.data, { status: 201 });
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);
      
      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: apiErr.message || "請檢查上傳的檔案格式或內容" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 401) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "請先登入會員" },
          { status: 401 }
        );
      } else if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "error", message: "尚未建立主辦方資料" },
          { status: 403 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("處理活動圖片上傳時發生錯誤:", error);
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
