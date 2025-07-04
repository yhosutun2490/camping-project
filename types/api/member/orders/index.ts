import { SuccessResponse } from "@/types/api/response";
type EventAddon = {
  id: string;
  name: string;
  price: number;
};
export type OrderStatus = "Unpaid" | "Paid" | "Refunded" | "Refunding";   // ← 和後端保持一致
export type MemberOrder = {
  id: string;
  event_info: {
    id: string;
    name: string;
    date: string;
    image: string | null;
  };
  event_plan: {
    id: string;
    title: string;
    price: number;
  };
  quantity: number;
  total_price: number;
  book_at: string | null;
  created_at: string;
  event_addons: EventAddon[];
  status: OrderStatus
};

export type GetMemberOrdersResponse = SuccessResponse<{
  orders: MemberOrder[];
}>;

export type PostMemberOrderRequest = {
  event_plan_id: string;
  quantity: number;
  event_addons?: EventAddon[];
};

export type PostMemberOrderResponse = SuccessResponse<{
  order_info: {
    orderid: string;
    event_plan_id: string;
    event_title: string;
    event_plan_price: number;
    quantity: number;
    total_price: number;
    book_at: string | null;
    created_at: string;
    event_addons: {
      id: string;
      name: string;
      price: number;
    }[];
  };
}>;

export interface PatchMemberOrderRequest {
  orderId: string;
  event_plan_id: string;
  quantity: number;
  event_addons: {
    id: string;
    name: string;
    price: number;
  }[];
}

export type PatchMemberOrderResponse = SuccessResponse<{
  order_info: {
    orderid: string;
    event_plan_id: string;
    event_title: string;
    event_plan_price: number;
    quantity: number;
    total_price: number;
    updated_at: string;
    event_addons: {
      id: string;
      name: string;
      price: number;
    }[];
  };
}>;

export interface DeleteMemberOrderRequest {
  orderId: string,
  reason?: string; // 取消原因（選填）
}

// 回應結果
export type DeleteMemberOrderResponse = SuccessResponse<{
  id: string;
  status: "Cancelled";
  cancelled_at: string;
  cancellation_reason: string;
}>;
