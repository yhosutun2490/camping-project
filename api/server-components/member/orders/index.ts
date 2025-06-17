import axiosInstance from "@/api/axiosIntance";
import type { GetMemberOrdersResponse, OrderStatus } from "@/types/api/member/orders";
import { formatAxiosError } from "@/utils/errors";
import { cookies } from "next/headers";
import { ErrorResponse } from "@/types/api/response";

const buildEndpoint = (status?: OrderStatus) =>
  status ? `/member/orders/status/${status}` : "/member/orders";

/**
 * 會員取得自己的購物車訂單(未付款、已付款、退款、取消等)
 */
export const memberGetOrders = async ( 
  status?: OrderStatus
): Promise<GetMemberOrdersResponse['data'] | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<GetMemberOrdersResponse>(
       buildEndpoint(status),
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log('get orders err',err)
    formatAxiosError(err) as ErrorResponse
    return null;
  }
};
