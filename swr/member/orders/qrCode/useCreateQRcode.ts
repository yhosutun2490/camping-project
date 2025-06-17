import axios from "axios";
import useSWRMutation from "swr/mutation";
import type { PostMemberTicketsQrCodeResponse } from "@/types/api/member/orders/ticket"


/** 創建已付款票卷 QR code */
export function usePostMemberOrdersQRcode() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/member/orders/${orderId}/ticket",
    async (_key: string, { arg }: { arg: { orderId: string } }) => {
      const res = await axios.post<PostMemberTicketsQrCodeResponse>(
        `/api/member/orders/ticket`,
        arg
      );
      return res.data.ticket;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

