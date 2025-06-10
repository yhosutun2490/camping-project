import { SuccessResponse } from "@/types/api/response";

// 活動建立請求參數介面
export interface CreateEventRequest {
  title: string;
  address: string;
  description: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  cancel_policy: string;
  registration_open_time: string;
  registration_close_time: string;
}

// 活動建立回應介面
export type CreateEventResponse = SuccessResponse<{
  event: {
    id: string;
    host_info_id: string;
    title: string;
    status: string;
    active: string;
  }
}>;

// 活動查詢參數介面
export interface GetEventsParams {
  startTime?: string;
  endTime?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  per?: number;
  sort?: "asc" | "desc";
}

// 分頁資訊介面
export interface PaginationInfo {
  page: number;
  per: number;
  total: number;
  total_pages: number;
  sort: string;
}

// 活動列表項目介面
export interface EventListItem {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  address: string;
  price: string;
}

// 活動列表回應介面
export type GetEventsResponse = SuccessResponse<{
  pagination: PaginationInfo;
  events: EventListItem[];
}>;

// 活動行前提醒介面
export interface EventNotice {
  type: string;
  content: string;
}

// 活動標籤介面
export interface EventTag {
  id: string;
  name: string;
  description: string;
  level: number;
}

// 活動圖片類型
export type EventImageType = "cover" | "detail";

// 活動圖片介面
export interface EventImage {
  imageId: string;
  event_info_id: string;
  imageUrl: string;
  type: EventImageType;
  description: string;
}

// 上傳活動圖片回應介面
export type UploadEventImagesResponse = SuccessResponse<EventImage[]>;

// 更新活動行前提醒與標籤請求介面
export interface UpdateEventNoticesTagsRequest {
  tagIds: string[];
  notices: EventNotice[];
}

// 更新活動行前提醒與標籤回應介面
export type UpdateEventNoticesTagsResponse = SuccessResponse<{
  event_id: string;
  notices_updated: number;
  tags_updated: number;
  notices: EventNotice[];
  tags: EventTag[];
}>;

// 活動方案加購項目介面
export interface EventPlanAddon {
  name: string;
  price: number;
}

// 活動方案介面（請求用）
export interface EventPlanRequest {
  title: string;
  price: number;
  discounted_price?: number;
  contents: string[];
  addons: EventPlanAddon[];
}

// 活動方案介面（回應用）
export interface EventPlan {
  id: string;
  title: string;
  price: number;
  discounted_price: number | null;
  contents: string[];
  addons: EventPlanAddon[];
}

// 建立活動方案請求參數介面
export interface CreateEventPlansRequest {
  plans: EventPlanRequest[];
}

// 建立活動方案回應介面
export type CreateEventPlansResponse = SuccessResponse<{
  event_info_id: string;
  plans: EventPlan[];
}>;
