import axiosInstance from "@/api/axiosIntance";
import type { MemberGetProfileResponse } from "@/types/api/member/profile";
import { formatAxiosError } from "@/utils/errors";
import { cookies } from "next/headers";
import { ErrorResponse } from "@/types/api/response";
const endpoint = "/member/profile";

/**
 * 會員取得自己的基本資料
 */
export const memberGetProfile = async (): Promise<MemberGetProfileResponse | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<MemberGetProfileResponse>(
      endpoint,
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    formatAxiosError(err) as ErrorResponse
    return null;
  }
};
