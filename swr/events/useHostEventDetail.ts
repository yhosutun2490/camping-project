import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { GetHostEventDetailRequest, GetHostEventDetailResponse } from '@/types/api/host/eventDetail';

/**
 * 取得主辦方活動詳情的自定義 Hook
 * @returns {Object} 包含觸發函式、載入狀態、錯誤和資料的物件
 */
export function useHostEventDetail() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    '/api/events/eventDetail',
    async (_key: string, { arg }: { arg: GetHostEventDetailRequest }) => {
      const response = await axios.post<GetHostEventDetailResponse>(
        '/api/events/eventDetail',
        arg
      );
      return response.data;
    }
  );

  return {
    getEventDetail: trigger,
    isLoading: isMutating,
    eventDetail: data?.data,
    error,
    data
  };
}
