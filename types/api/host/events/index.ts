import { SuccessResponse } from '../../response';

// 活動狀態
export type EventStatus = "草稿" | "已發布" | "已取消" | "已結束";

// 通知型別
export interface EventNotice {
  type: string;
  content: string;
}

// 活動圖片型別
export interface EventPhoto {
  id: string;
  url: string;
  description: string | null;
}

// 主辦方活動資訊
export interface HostEvent {
  /** 活動 ID */
  event_id: string;
  /** 活動狀態 */
  active: EventStatus;
  /** 發布時間 */
  publish_at: string | null;
  /** 活動標題 */
  title: string;
  /** 活動地址 */
  address: string;
  /** 緯度 */
  latitude: string | null;
  /** 經度 */
  longtitude: string | null;
  /** 活動描述 */
  description: string;
  /** 開始時間 */
  start_time: string;
  /** 結束時間 */
  end_time: string;
  /** 最大參與人數 */
  max_participants: number;
  /** 取消政策 */
  cancel_policy: string;
  /** 標籤列表 */
  tags: string[];
  /** 通知列表 */
  notices: EventNotice[];
  /** 活動圖片列表 */
  photos: EventPhoto[];
}

// 主辦方活動列表資料
export interface HostEventsData {
  /** 主辦方 ID */
  host_id: string;
  /** 活動列表 */
  event: HostEvent[];
}

// 主辦方活動列表回應
export type GetHostEventsResponse = SuccessResponse<HostEventsData>;
