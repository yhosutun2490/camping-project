
import { GetEventListSuccessResponse } from "@/types/api/admin"
import { cookies } from "next/headers";
import axiosInstance  from "@/api/axiosIntance"

type status = 'pending' | 'reject' | 'unpublish_pending'
export async function getAdminEvents(status: status): Promise<GetEventListSuccessResponse['data'] | null> {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('access_token')?.value
      if (!token) {
         return null; // 沒有 token，直接返回null
      }
      const {data} = await axiosInstance.get<GetEventListSuccessResponse['data'] >(
        `admin/events?active=${status}`,
        {
          headers: {
            Cookie: `access_token=${token}`,
          },
          withCredentials: true,
        }
      );
      return data
    } catch (err: unknown) {
      // 先宣告 err 為 unknown，再用斷言轉成 Error
      const e = err as Error
      console.warn(`取得admin活動資料有誤,${e.message}`)
      return null
    }
  }