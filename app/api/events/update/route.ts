import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/api/axiosIntance';
import type { ErrorResponse } from '@/types/api/response';
import { formatAxiosError } from '@/utils/errors';
import { UpdateEventRequest, UpdateEventResponse } from '@/types/api/events';

/**
 * 更新活動的 API 路由處理函式
 * 僅限已登入的主辦方使用，用來更新活動基本資料
 */
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<UpdateEventResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = req.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: 'failed', message: '請先登入會員' },
        { status: 401 }
      );
    }

    // 從查詢參數取得 eventId
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId');
    
    if (!eventId) {
      return NextResponse.json<ErrorResponse>(
        { status: 'error', message: '缺少活動 ID' },
        { status: 400 }
      );
    }

    // 解析請求體
    const eventData: UpdateEventRequest = await req.json();

    try {
      // 調用後端 API
      const response = await axiosInstance.patch<UpdateEventResponse>(
        `/events/${eventId}`,
        eventData,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<UpdateEventResponse>(response.data);
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: 'failed', message: '尚未建立主辦方資料' },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 404) {
        return NextResponse.json<ErrorResponse>(
          { status: 'error', message: '找不到活動' },
          { status: 404 }
        );
      } else if (apiErr.httpCode === 409) {
        return NextResponse.json<ErrorResponse>(
          { status: 'error', message: '已有同名活動於相同起始時間' },
          { status: 409 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error('處理活動更新時發生錯誤:', error);
    return NextResponse.json<ErrorResponse>(
      { status: 'error', message: '伺服器錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}
