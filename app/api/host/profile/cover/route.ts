import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/api/axiosIntance';
import type { ErrorResponse } from '@/types/api/response';
import { formatAxiosError } from '@/utils/errors';
import { UploadImageResponse } from '@/types/api/host';

// 處理主辦單位封面照上傳請求
export async function POST(
  request: NextRequest
): Promise<NextResponse<UploadImageResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json(
        { status: 'failed', message: '請先登入會員' },
        { status: 401 }
      );
    }

    

    try {
      // 獲取上傳的檔案
      const formData = await request.formData();
      // 調用 API 上傳檔案
      const response = await axiosInstance.post<UploadImageResponse>(
        '/host/profile/cover',
        formData,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json(response.data);
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      if (apiErr.httpCode === 404) {
        return NextResponse.json(
          { status: 'failed', message: '尚未建立主辦方資料' },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error('處理主辦單位封面照上傳時發生錯誤:', error);
    return NextResponse.json(
      { status: 'error', message: '伺服器錯誤，無法上傳主辦方封面照' },
      { status: 500 }
    );
  }
}
