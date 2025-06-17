
// Request Params
export type PostPaymentRequest = {
  orderIds: string[]; // 訂單 ID
}
export type PostPaymentResponse = {
    html: string; // 支付頁面 URL
}