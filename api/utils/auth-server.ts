import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserCheckResponse,UserRefreshTokenResponse } from "@/types/api/auth"
import { ErrorResponse } from "@/types/api/response"
const endpoint = "/auth";

/**
 * server component use
 * 使用者驗證是否登入 API 請求
 * 回傳登入成功後的使用者資料
 */
export const userVerifyToken = async (): Promise<UserCheckResponse | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<UserCheckResponse>(
      endpoint + "/check",
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

/**
 * server component use
 * 使用者刷新token API 請求 (Next api route 代理寫入cookies)
 * 回傳登入成功後的使用者資料
 */
export const userRefreshToken = async (): Promise<UserRefreshTokenResponse | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
      cache: 'no-store',      // 每次都要 fresh
      // credentials: 'include' // Server Component 下不需要，fetch 會攜帶同源 cookie
    });
    const response: UserRefreshTokenResponse = await res.json();
    return response;
  } catch (err) {
    formatAxiosError(err)
    return null
  }
};


/**
 * server component use
 * 自動更新token，如果refresh token 也過期需要導回首頁
 */
export const getUserRoleAndFallback = async (): Promise<UserCheckResponse| UserRefreshTokenResponse | null> => {
  const user = await userVerifyToken()
  if (user) return user
  const refreshResult = await userRefreshToken()
  if (refreshResult) return refreshResult
  redirect('/')
}
