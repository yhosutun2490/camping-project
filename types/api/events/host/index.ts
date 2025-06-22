import { SuccessResponse } from '../../response';

// 活動主辦方資訊
export interface EventHost {
  id: string;
  member_info_id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  verification_status: string;
  photo_url: string;
  photo_background_url: string;
  created_at: string;
  updated_at: string;
}

// 活動圖片
export interface EventPhoto {
  id: string;
  event_info_id: string;
  type: 'cover' | 'detail';
  photo_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// 活動通知
export interface EventNotice {
  id: string;
  event_info_id: string;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 方案內容
export interface EventPlanContent {
  id: string;
  event_plan_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 方案加購品
export interface EventPlanAddon {
  id: string;
  event_plan_id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

// 活動方案
export interface EventPlan {
  id: string;
  event_info_id: string;
  title: string;
  price: number;
  discounted_price: number | null;
  created_at: string;
  updated_at: string;
  eventPlanContentBox: EventPlanContent[];
  eventPlanAddonBox: EventPlanAddon[];
}

// 活動標籤
export interface EventTag {
  id: string;
  name: string;
  description: string | null;
  level: string | null;
}

// 活動評論 (預留給未來使用)
export type EventComment = unknown;

// 主辦活動詳情
export interface EventDetail {
  id: string;
  host_info_id: string;
  title: string;
  address: string;
  description: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  cancel_policy: string;
  active: string;
  status: string;
  registration_open_time: string;
  registration_close_time: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  host: EventHost;
  photos: EventPhoto[];
  notices: EventNotice[];
  plans: EventPlan[];
  tags: EventTag[];
  comments: EventComment[];
}

// 回應型別
export type GetEventDetailResponse = SuccessResponse<EventDetail>;
