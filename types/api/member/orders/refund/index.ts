import { SuccessResponse } from "@/types/api/response";
export type OrderInfo = {
  id: string;
  status: "Refunding" | "Paid" | "Pending" | "Cancelled" | "Refunded"; // 根據實際狀態可擴充
  refundAmount: number;
  refundedAt: string; // ISO 日期字串
};

export type OrderPay = {
  id: string;
  paidAmount: number;
  refundAmount: number;
  refundedAt: string | null; // 尚未退款時為 null
};

export type OrderData = {
  orderInfo: OrderInfo;
  orderPay: OrderPay;
};

export type OrderRefundResponse = SuccessResponse<OrderData>