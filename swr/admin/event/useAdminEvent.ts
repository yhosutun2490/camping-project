import axios from 'axios'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { GetAdminEventByIdSuccessResponse } from '@/types/api/admin'


/* 讓別的元件能直接用 SWR cache 讀取 */
export function useAdminEventCache(eventId?: string) {
  return useSWR<GetAdminEventByIdSuccessResponse>(
    eventId ? `/api/admin/events/${eventId}` : null,
    null           // 不自動 fetch，只讀 cache
  )
}

/* 只有按鈕點擊時才 fetch */
export function useAdminEventFetcher() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    '/api/admin/events/fetcher',              // 任意 key
    async (_key: string, { arg }: { arg: { eventId: string } }): Promise<GetAdminEventByIdSuccessResponse['data']> => {
      const { eventId } = arg
      const res = await axios.get<GetAdminEventByIdSuccessResponse['data']>(
        `/api/admin/events`,
        { params: { eventId } }   
      )
      // ☝️ 取到後直接寫進 SWR 全域快取
      mutate(`/api/admin/events/${eventId}`, res.data, false)
      return res.data
    }
  )

  return { trigger, isMutating, data, error }
}