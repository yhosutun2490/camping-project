import axiosInstance from "@/api/axiosIntance";
import type { GetMemberOrdersResponse } from "@/types/api/member/orders";
import { formatAxiosError } from "@/utils/errors";
import { cookies } from "next/headers";
import { ErrorResponse } from "@/types/api/response";

const endpoint = "/member/orders";

/**
 * 會員取得自己的訂單
 */
export const memberGetOrders = async (): Promise<GetMemberOrdersResponse['data'] | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<GetMemberOrdersResponse>(
      endpoint,
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
