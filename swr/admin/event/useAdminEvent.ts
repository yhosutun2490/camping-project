import axios from 'axios'
import useSWR, { mutate } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { 
  GetAdminEventByIdSuccessResponse, 
  PatchAdminApproveEventSuccessResponse,
  PatchUnpublishEventBody,
  PatchAdminUnpublishEventSuccessResponse,
  PostAiCheckSuccessResponse
} from '@/types/api/admin'


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

/** Admin活動審核通過 */
export function useAdminApproveEvent() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/admin/events/:id/approve",
    async (_key: string, { arg: payload }: { arg: {eventId: string} }) => {
      const res = await axios.patch<PatchAdminApproveEventSuccessResponse>(
        "/api/admin/events/approve",
        payload
      );
      return res;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

/** Admin活動審核g失敗(退回) */
export function useAdminRejectEvent() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/admin/events/:id/reject",
    async (_key: string, { arg: payload }: { arg: {eventId: string, reason?:string} }) => {
      const res = await axios.patch<PatchAdminApproveEventSuccessResponse>(
        "/api/admin/events/reject",
        payload
      );
      return res;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

/** Admin審核待下架活動*/
export function useAdminUnpublishEvent() {
    const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/admin/events/:id/unpublish",
    async (_key: string, { arg: payload }: { arg: PatchUnpublishEventBody }) => {
      const res = await axios.patch<PatchAdminUnpublishEventSuccessResponse>(
        "/api/admin/events/unpublish",
        payload
      );
      return res;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

/** Admin ai 智能審核活動上架*/

export function useAdminAICheckEvent() {
    const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/admin/events/:id/ai-check",
    async (_key: string, { arg: payload }: { arg: {eventId:string} }) => {
      const res = await axios.post<PostAiCheckSuccessResponse>(
        "/api/admin/events/ai-check",
        payload
      );
      return res.data.data;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}