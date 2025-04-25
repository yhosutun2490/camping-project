import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "@/types/page/main/user";
const endpoint = "/auth";

type ApiResponse<T> = {
  data: {
    member: T;
  };
  message: string;
  status: string;
};

/**
 * server component use
 * 使用者驗證是否登入 API 請求
 * 回傳登入成功後的使用者資料
 */
export const userVerifyToken = async (): Promise<UserRole | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<ApiResponse<UserRole>>(
      endpoint + "/check",
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      }
    );
    return response.data.data.member;
  } catch (err) {
    formatAxiosError(err)
    return null;
  }
};

/**
 * server component use
 * 使用者刷新token API 請求
 * 回傳登入成功後的使用者資料
 */
export const userRefreshToken = async (): Promise<UserRole | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<ApiResponse<UserRole>>(
      endpoint + "/refresh",
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      }
    );
    return response.data.data.member;
  } catch (err) {
    formatAxiosError(err)
    return null
  }
};


/**
 * server component use
 * 自動更新token，如果refresh token 也過期需要導回首頁
 */
export const getUserRoleAndFallback = async (): Promise<UserRole | null> => {
  const user = await userVerifyToken()
  if (user) return user
  const refreshResult = await userRefreshToken()
  if (refreshResult) return refreshResult
  redirect('/')
}
