import { SuccessResponse } from "@/types/api/response";

// Request Params
export type PostPaymentRequest = {
  orderIds: string[]; // 訂單 ID
}
export type PostPaymentResponse = SuccessResponse<{
    html: string; // 支付頁面 URL
}>