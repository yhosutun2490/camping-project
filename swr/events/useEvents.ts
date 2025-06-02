import useSWR from 'swr';
import { GetEventsParams, GetEventsResponse } from '@/types/api/events';
import axios from 'axios';

/**
 * 用於獲取活動列表的自定義 Hook
 * @param params 查詢參數
 * @returns {Object} 包含活動資料、載入狀態和錯誤的物件
 */
export function useEvents(params?: GetEventsParams) {
  // 構建查詢字串
  const queryParams = new URLSearchParams();

  if (params) {
    if (params.startTime) queryParams.append('startTime', params.startTime);
    if (params.endTime) queryParams.append('endTime', params.endTime);
    if (params.location) queryParams.append('location', params.location);
    if (params.minPrice !== undefined)
      queryParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice !== undefined)
      queryParams.append('maxPrice', params.maxPrice.toString());
    if (params.page !== undefined)
      queryParams.append('page', params.page.toString());
    if (params.per !== undefined)
      queryParams.append('per', params.per.toString());
    if (params.sort) queryParams.append('sort', params.sort);
  }

  // 建立查詢字串
  const queryString = queryParams.toString();
  const url = `/api/events${queryString ? `?${queryString}` : ''}`;

  // 使用 SWR 進行資料獲取
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<GetEventsResponse>(url, async () => {
      const response = await axios.get<GetEventsResponse>(url);
      return response.data;
    });

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
