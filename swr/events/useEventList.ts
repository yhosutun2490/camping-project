// hooks/useEventList.ts
import useSWRInfinite from "swr/infinite";
import axios from "axios";
import type {
  GetEventsParams,
  EventListResponse,
} from "@/types/api/event/allEvents";

export const fetcher = (url: string) =>
  axios.get(url).then(res => res.data.data);

/**
 * 取得活動列表 利用query string 查詢 和 loadMore 取得更多分頁
 * @param filters 搜尋活動的query string 參數
 */
export function useEventList(filters: GetEventsParams) {
  const perPage = filters.per ?? 10;

  // key generator：捕獲外部 filters
  const getKey = (pageIndex: number, prev: EventListResponse | null) => {
    // 到底無更多資料停止獲取資料
    if (prev?.data.events.length === 0) return null;

    // params 條件解構
    const p: GetEventsParams = {
      ...filters,
      page: pageIndex + 1,
      per: perPage,
      sort: "asc",
    };

    // 只留有值的 key，轉 query string
    const queryString = new URLSearchParams(
      Object.entries(p).reduce<Record<string, string>>((acc, [k, v]) => {
        if (v != null) acc[k] = String(v);
        return acc;
      }, {})
    );
    return `/api/allEvents?${queryString.toString()}`;
  };

  // SWR infinite 主體
  const { data, size, setSize, isValidating, mutate } =
    useSWRInfinite<EventListResponse>(getKey, fetcher, {
      revalidateFirstPage: false,
    });
  const events = data?.flatMap(d => d.data?.events ?? []) ?? [];
  const totalCount = data?.[0]?.data.pagination.total ?? 0;


  // isReachingEnd
  const isReachingEnd = (() => {
    if (!data || data.length === 0) return false;

    const last = data[data.length - 1];
    const list = last?.data?.events;
    // 如果最後一頁沒有 data 或 events 就當成「到底了」
    if (!Array.isArray(list)) return true;
    return list.length < perPage;
  })();

  return {
    events,
    isLoading: !data && isValidating,
    totalCount,
    isLoadingMore: isValidating,
    hasMore: !isReachingEnd,
    loadMore: () => setSize(size + 1),
    refresh: () => mutate(), // 强制重抓
    reset: () => setSize(1), // 回第一頁
  };
}