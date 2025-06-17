import axios from "axios";
import {
  PostPaymentRequest,
  PostPaymentResponse
} from "@/types/api/member/orders/payment";
import useSWRMutation from "swr/mutation";

/** 訂單付款 */
export function usePostMemberOrdersPayment() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/payment",
    async (_key: string, { arg: payload }: { arg: PostPaymentRequest }) => {
      const res = await axios.post<PostPaymentResponse>(
        "/api/member/orders/payment",
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

