// types
import { z } from "zod";

export type EventPlanContentItem = {
  id: string;
  event_plan_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type EventPlanAddonItem = {
  id: string;
  event_plan_id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export type EventPlan = {
  id: string;
  event_info_id: string;
  title: string;
  price: number;
  discounted_price: number;
  people_capacity: number;
  created_at: string;
  updated_at: string;
  eventPlanContentBox: EventPlanContentItem[];
  eventPlanAddonBox: EventPlanAddonItem[];
};

export const eventPlanSchema = z.object({
  event_plan_id: z.string({ required_error: "方案 ID 為必填" }),
  quantity: z.number().int().min(1, "數量至少為 1"),
  event_plan_price: z.number().min(0, "價格不能為負數"),
  event_addons: z
    .array(
      z.object({
        addon_id: z.string({ required_error: "加購器具 ID 為必填" }),
        name: z.string().min(1, "加購項目名稱為必填"),
        price: z.number().min(0, "價格不能為負數"),
      })
    )
    .optional(), // 如果沒有加購品也能送出
});