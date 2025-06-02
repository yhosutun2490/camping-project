import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { CreateEventPlansRequest, CreateEventPlansResponse } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 建立活動方案的 API 路由處理函式
 * 需登入並擁有活動主辦權限，用來為指定活動建立方案
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
): Promise<NextResponse<CreateEventPlansResponse | ErrorResponse>> {
  // 在 Next.js App Router 中，params 是一個 Promise，需要先 await
  const { eventId } = await params;
  
  // 檢查活動 ID 是否存在
  if (!eventId) {
    return NextResponse.json<ErrorResponse>(
      { status: "failed", message: "缺少活動 ID 或方案資料" },
      { status: 400 }
    );
  }

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
    const plansData: CreateEventPlansRequest = await req.json();
    
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
    // 處理 JSON 解析錯誤或其他未預期錯誤
    console.error("建立活動方案 API 發生錯誤:", error);
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
