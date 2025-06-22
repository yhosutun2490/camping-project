import useSWR from 'swr';
import axios from 'axios';
import { GetHostEventsResponse } from '@/types/api/host/events';

/**
 * 取得主辦方活動列表的自定義 Hook
 * @param {string} [tagId] - 篩選的標籤 ID，空字串或 undefined 表示不篩選
 * @returns {Object} 包含活動資料、載入狀態和錯誤的物件
 */
export function useHostEvents(tagId?: string) {
  // 建構前端 API URL，如果有 tagId 就加入 query string
  const apiUrl = tagId && tagId.trim() !== '' 
    ? `/api/host/events?tag=${encodeURIComponent(tagId)}`
    : '/api/host/events';

  const { data, error, isLoading, mutate } = useSWR<GetHostEventsResponse>(
    apiUrl,
    async (url: string) => {
      const response = await axios.get<GetHostEventsResponse>(url);
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
