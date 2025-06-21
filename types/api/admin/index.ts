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