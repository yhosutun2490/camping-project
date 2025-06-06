import {
    SuccessResponse,
  } from "@/types/api/response";
type EventAddon = {
  name: string
  price: number
}

type MemberOrderItem = {
  event_plan_id: string
  quantity: number
  event_plan_price: number
  event_addons: EventAddon[]
}

type MemberOrder = {
  member_id: string
  items: MemberOrderItem[]
  total_price: number // 若你有總價欄位的話
}

export type GetMemberOrders = SuccessResponse<MemberOrder>