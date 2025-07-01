import { SuccessResponse } from '../../response';

// 主辦方活動詳情請求參數
export interface GetHostEventDetailRequest {
  eventId: string;
}

// 主辦方活動詳情中的主辦方資訊
export interface HostDetailInfo {
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

// 活動照片資訊
export interface EventPhotoDetail {
  id: string;
  event_info_id: string;
  type: string;
  photo_url: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// 活動通知資訊
export interface EventNoticeDetail {
  id: string;
  event_info_id: string;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 活動方案內容
export interface EventPlanContentDetail {
  id: string;
  event_plan_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 活動方案加購品
export interface EventPlanAddonDetail {
  id: string;
  event_plan_id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

// 活動方案詳情
export interface EventPlanDetail {
  id: string;
  event_info_id: string;
  title: string;
  price: number;
  discounted_price: number | null;
  people_capacity: number;
  created_at: string;
  updated_at: string;
  eventPlanContentBox: EventPlanContentDetail[];
  eventPlanAddonBox: EventPlanAddonDetail[];
}

// 活動標籤資訊
export interface EventTagDetail {
  id: string;
  name: string;
  description: string | null;
  level: string | null;
}

// 活動評論資訊
export interface EventCommentDetail {
  id: string;
  event_info_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// 主辦方活動詳情資料
export interface HostEventDetailData {
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
  host: HostDetailInfo;
  photos: EventPhotoDetail[];
  notices: EventNoticeDetail[];
  plans: EventPlanDetail[];
  tags: EventTagDetail[];
  comments: EventCommentDetail[];
}

// 主辦方活動詳情回應
export type GetHostEventDetailResponse = SuccessResponse<HostEventDetailData>;
