
import {UserCheckResponse} from "@/types/api/auth/index"
import { cookies } from "next/headers";
import axiosInstance  from "@/api/axiosIntance"

export async function getUserInfo(): Promise<UserCheckResponse | null> {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('access_token')?.value
      if (!token) {
         return null; // 沒有 token，直接返回null
     }
      const res = await axiosInstance.get<UserCheckResponse>(
        "/auth/check",
        {
          headers: {
            Cookie: `access_token=${token}`,
          },
          withCredentials: true,
        }
      );
      return res.data
    } catch (err: unknown) {
      // 先宣告 err 為 unknown，再用斷言轉成 Error
      const e = err as Error
      console.warn(`登入check個人資料錯誤,${e.message}`)
      return null
    }
  }