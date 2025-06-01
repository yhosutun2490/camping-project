import useSWR from 'swr';
import axios from 'axios';
import { EventTagsResponse } from '@/types/api/meta';

// 取得所有活動標籤的 hook
export function useEventTags() {
  const { data, error, isLoading, mutate } = useSWR<EventTagsResponse>(
    '/api/meta/event-tags',
    async (url: string) => {
      const res = await axios.get<EventTagsResponse>(url);
      return res.data;
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate
  };
}
