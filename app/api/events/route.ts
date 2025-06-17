import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/api/axiosIntance';
import type {
  GetApiV1EventsParams,
  GetApiV1Events200Data,
} from '@/types/services/Event';
import type { ErrorResponse } from '@/types/api/response';
import { formatAxiosError } from '@/utils/errors';
import { CreateEventRequest, CreateEventResponse } from '@/types/api/events';

function getOptionalNumber(val: string | null): number | undefined {
  if (!val) return undefined;
  const parsed = Number(val);
  return isNaN(parsed) ? undefined : parsed;
}

/**
 * 公開取得所有活動列表資訊
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const apiParams: GetApiV1EventsParams = {
      location: searchParams.get('location') ?? undefined,
      people: searchParams.get('person')
        ? parseInt(searchParams.get('person')!, 10)
        : undefined,
      start_time: searchParams.get('start_time') ?? undefined,
      end_time: searchParams.get('end_time') ?? undefined,
      min_price: getOptionalNumber(searchParams.get('minPrice')),
      max_price: getOptionalNumber(searchParams.get('maxPrice')),
      page: Number(searchParams.get('page')) ?? 1,
      per: Number(searchParams.get('per')) ?? 10,
      sort: searchParams.get('sort') as 'asc' | 'desc',
      // 其他 page/per/sort 也可以同理加上
    };
    // 清除undefine條件
    const cleanedParams = Object.fromEntries(
      Object.entries(apiParams).filter(([, value]) => value !== undefined)
    );
    console.log('cleanedParams', cleanedParams);
    const data = await axiosInstance.get<GetApiV1Events200Data>('/events', {
      params: cleanedParams,
    });
    return NextResponse.json({ code: 200, data: data.data });
  } catch (err: unknown) {
    const apiErr = formatAxiosError(err);
    console.warn('err', err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status,
        message: apiErr.message,
      },
      { status: apiErr.httpCode }
    );
  }
}

/**
 * 建立活動的 API 路由處理函式
 * 僅限已登入的主辦方使用，用來建立活動基本資料
 */
export async function POST(
  req: NextRequest
): Promise<NextResponse<CreateEventResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = req.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json<ErrorResponse>(
        { status: 'failed', message: '請先登入會員' },
        { status: 401 }
      );
    }

    // 解析請求體
    const eventData: CreateEventRequest = await req.json();

    try {
      // 調用後端 API
      const response = await axiosInstance.post<CreateEventResponse>(
        '/events',
        eventData,
        {
          headers: {
            Cookie: `access_token=${accessToken}`,
          },
          withCredentials: true,
        }
      );

      // 返回成功回應
      return NextResponse.json<CreateEventResponse>(response.data, {
        status: 201,
      });
    } catch (error: unknown) {
      // 處理 Axios 錯誤
      const apiErr = formatAxiosError(error);

      // 依據不同錯誤代碼回傳不同錯誤訊息
      if (apiErr.httpCode === 403) {
        return NextResponse.json<ErrorResponse>(
          { status: 'failed', message: '尚未建立主辦方資料' },
          { status: 403 }
        );
      } else if (apiErr.httpCode === 409) {
        return NextResponse.json<ErrorResponse>(
          { status: 'failed', message: '該活動已存在，請勿重複建立' },
          { status: 409 }
        );
      } else if (apiErr.httpCode === 400) {
        return NextResponse.json<ErrorResponse>(
          { status: 'failed', message: '請填寫必填欄位' },
          { status: 400 }
        );
      } else {
        return NextResponse.json<ErrorResponse>(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error('處理活動建立時發生錯誤:', error);
    return NextResponse.json<ErrorResponse>(
      { status: 'error', message: '伺服器錯誤，請稍後再試' },
      { status: 500 }
    );
  }
}