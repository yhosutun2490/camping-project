// lib/serverApiClient.ts
import axiosInstance from "./index";
import { cookies } from "next/headers";

/**
 * next route api 請求夾帶token
 */
axiosInstance.interceptors.request.use(async(config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (token) {
      // 保留原有 header，再插入 Cookie
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)["Cookie"] = `access_token=${token}`;
    }
    return config;
  
})
export default axiosInstance;