// utils/errors.ts
import axios from "axios";
import { ErrorResponse } from "@/types/api/response";

/**
 * 自訂 Error，implements ErrorResponse，
 * 並額外帶回真正要回給瀏覽器 header 的 HTTP code（httpCode）
 */
export class ApiError extends Error implements ErrorResponse {
  public readonly httpCode: number;               // HTTP status code
  public readonly status:  ErrorResponse["status"]; // 一定是 "failed" 或 "error"

  constructor(httpCode: number, message: string) {
    super(message);
    this.name = "ApiError";

    this.httpCode = httpCode;
    // 4xx 視為「failed」，其他（包含 5xx）視為「error」
    this.status   = httpCode >= 400 && httpCode < 500 ? "failed" : "error";
  }
}

// ✅ 錯誤格式化工具
export function formatAxiosError(e: unknown): ApiError {
  if (axios.isAxiosError(e)) {
    const httpCode = e.response?.status ?? 500;
    const message = e.response?.data?.message ?? "伺服器發生錯誤";
    return new ApiError(httpCode, message); // 依賴建構class ApiError轉換成 ErrorResponse 格式
  }

  // fallback 處理非 Axios 錯誤
  return new ApiError(500,  "發生未知錯誤");
}