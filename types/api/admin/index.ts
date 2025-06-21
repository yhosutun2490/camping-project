import { SuccessResponse } from "@/types/api/response"

/** 單筆活動摘要 */
export interface EventSummary {
  id: string;                    // UUID
  title: string;
  cover_photo_url: string;       // 圖片網址
  photo_count: number;
  start_date: string;            // ISO 8601
  end_date: string;              // ISO 8601
  max_participants: number;
  max_price: number;
  active_status: "待審核" | "公開中" | "已下架"; // 依實際後端列舉擴充
}

/** 取得活動清單 API 回傳格式 */
export interface GetEventListResponse {
  status: "success" | "error";   // 照後端規格
  total_data: number;
  current_page: number;
  page_size: number;
  total_page: number;
  data_lists: EventSummary[];
}

// 若 SuccessResponse 是泛型，這樣使用：
export type GetEventListSuccessResponse = SuccessResponse<GetEventListResponse>;


export type EventDetail = {
  id: string;
  host_info_id: string;
  title: string;
  address: string;
  description: string;
  start_time: string; // ISO date string
  end_time: string;
  max_participants: number;
  cancel_policy: string;
  active: "pending" | "approved" | "rejected" | string;
  is_rejected: boolean;
  status: "preparing" | "open" | "closed" | string;
  registration_open_time: string;
  registration_close_time: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  eventPhotoBox: EventPhoto[];
  eventPlanBox: EventPlan[];
};

export type EventPhoto = {
  id: string;
  event_info_id: string;
  type: "cover" | "detail" | string;
  photo_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type EventPlan = {
  id: string;
  event_info_id: string;
  title: string;
  price: number;
  discounted_price: number;
  people_capacity: number | null;
  created_at: string;
  updated_at: string;
  eventPlanAddonBox: EventPlanAddon[];
  eventPlanContentBox: EventPlanContent[];
};

export type EventPlanAddon = {
  id: string;
  event_plan_id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export type EventPlanContent = {
  id: string;
  event_plan_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};



export type EventByIdResponse = {
  status: "success";
  active_status: "待審核" | string;
  data: EventDetail;
};

export type GetAdminEventByIdSuccessResponse = SuccessResponse<EventByIdResponse>;