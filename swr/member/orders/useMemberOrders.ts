import axios from "axios";
import {
 PostMemberOrderRequest,
 PostMemberOrderResponse
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