import axios from "axios";
import {
 PostMemberOrderRequest,
 PostMemberOrderResponse,
 DeleteMemberOrderResponse,
 PatchMemberOrderRequest,
 PatchMemberOrderResponse
} from "@/types/api/member/orders";
import useSWRMutation from "swr/mutation";

/** 創建會員訂單 */
export function usePostMemberOrders() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/post",
    async (_key: string, { arg: payload }: { arg: PostMemberOrderRequest }) => {
      const data = await axios.post<PostMemberOrderResponse>(
        "/api/member/orders",
        payload
      );
      return data;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

/**
 * 修改會員訂單
 */
export function usePatchMemberOrders() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/patch",
    async (_key: string, { arg: payload }: { arg: PatchMemberOrderRequest }) => {
      const data = await axios.patch<PatchMemberOrderResponse>(
        "/api/member/orders",
        payload
      );
      return data;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

/** 刪除會員訂單 */
type DeleteOrderParams = {
  id: string,
  reason?:string
}
export function useDeleteMemberOrders() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/delete",
    async (_key: string, { arg: payload }: { arg: DeleteOrderParams}) => {
        const { id, ...body } = payload;
      const data = await axios.delete<DeleteMemberOrderResponse>(
        `/api/member/orders/${id}`,
        { data: body }
      );
      return data;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}