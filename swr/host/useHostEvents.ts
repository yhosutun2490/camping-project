import useSWR from 'swr';
import axios from 'axios';
import { GetHostEventsResponse } from '@/types/api/host/events';

/**
 * 取得主辦方活動列表的自定義 Hook
 * @returns {Object} 包含活動資料、載入狀態和錯誤的物件
 */
export function useHostEvents() {
  const { data, error, isLoading, mutate } = useSWR<GetHostEventsResponse>(
    '/api/host/events',
    async () => {
      const response = await axios.get<GetHostEventsResponse>('/api/host/events');
      return response.data;
    }
  );

  return {
    data,
    events: data?.data?.event || [],
    hostId: data?.data?.host_id,
    error,
    isLoading,
    mutate
  };
}
