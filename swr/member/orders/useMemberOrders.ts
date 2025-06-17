import axios from "axios";
import {
  PostMemberOrderRequest,
  PostMemberOrderResponse,
  DeleteMemberOrderResponse,
  PatchMemberOrderRequest,
  PatchMemberOrderResponse,
} from "@/types/api/member/orders";
import useSWRMutation from "swr/mutation";

/** 創建會員訂單 */
export function usePostMemberOrders() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/post",
    async (_key: string, { arg: payload }: { arg: PostMemberOrderRequest }) => {
      const res = await axios.post<PostMemberOrderResponse>(
        "/api/member/orders",
        payload
      );
      return res.data.data.order_info;
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
    async (
      _key: string,
      { arg: payload }: { arg: PatchMemberOrderRequest  }
    ) => {
      const data = await axios.patch<PatchMemberOrderResponse>(
        `/api/member/orders`,
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
  orderId: string;
  reason?: string;
};
export function useDeleteMemberOrders() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/delete",
    async (_key: string, { arg: payload }: { arg: DeleteOrderParams }) => {
      const data = await axios.delete<DeleteMemberOrderResponse>(
        `/api/member/orders`,
        { data: payload }
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


/** 會員已付款訂單退款 */
type RefundOrderParams = {
  orderId: string;
};
export function useRefundMemberOrders() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/refund",
    async (_key: string, { arg: payload }: { arg: RefundOrderParams }) => {
      const data = await axios.post<RefundOrderParams>(
        `/api/member/orders/refund`,
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
