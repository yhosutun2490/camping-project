// utils/errors.ts
import axios from "axios";

// 可選：自定義錯誤類別
export class ApiError extends Error {
  constructor(
    public status: number | string,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ✅ 錯誤格式化工具
export function formatAxiosError(e: unknown): ApiError {
  if (axios.isAxiosError(e)) {
    const status = e.response?.status ?? "UNKNOWN";
    const message = e.response?.data?.message ?? "伺服器發生錯誤";
    return new ApiError(status, message);
  }

  // fallback 處理非 Axios 錯誤
  return new ApiError("UNKNOWN",  "發生未知錯誤");
}