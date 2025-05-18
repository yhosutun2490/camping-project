import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { UpdateEventNoticesTagsRequest, UpdateEventNoticesTagsResponse } from "@/types/api/events";
import { ErrorResponse } from "@/types/api/response";

/**
 * 更新活動行前提醒與標籤的 API 路由處理函式
 * 主辦方更新指定活動的行前提醒與標籤。若陣列為空則代表清除所有設定。
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { eventId: string } }
): Promise<NextResponse<UpdateEventNoticesTagsResponse | ErrorResponse>> {
  const { eventId } = params;

  // 檢查活動 ID 是否存在
  if (!eventId) {
    return NextResponse.json<ErrorResponse>(
      { status: "failed", message: "尚未建立活動" },
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
    const updateData: UpdateEventNoticesTagsRequest = await req.json();

    try {
      // 調用後端 API
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

      // 返回成功回應
      return NextResponse.json<UpdateEventNoticesTagsResponse>(response.data);
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "尚未建立活動" },
          { status: 400 }
        );
      } else if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: "failed", message: "尚未建立主辦方資料" },
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
    console.error("處理活動行前提醒與標籤更新時發生錯誤:", error);
    return NextResponse.json<ErrorResponse>(
      { status: "error", message: "伺服器錯誤，請稍後再試" },
      { status: 500 }
    );
  }
}
