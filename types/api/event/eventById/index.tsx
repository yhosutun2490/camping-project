import {
    SuccessResponse,
} from "@/types/api/response";


export type GetApiV1EventsEventIdResponse = SuccessResponse<{
  id: string;
  host_info_id: string;
  title: string;
  address: string;
  description: string;
  start_time: string;
  end_time: string;
  bookingCounts: number;
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
  host: {
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
  };
  photos: {
    id: string;
    event_info_id: string;
    type: string;
    photo_url: string;
    description: string | null;
    created_at: string;
    updated_at: string;
  }[];
  notices: {
    id: string;
    event_info_id: string;
    type: string;
    content: string;
    created_at: string;
    updated_at: string;
  }[];
  plans: {
    id: string;
    event_info_id: string;
    title: string;
    price: number;
    discounted_price: number;
    people_capacity: number;
    created_at: string;
    updated_at: string;
    eventPlanContentBox: {
      id: string;
      event_plan_id: string;
      content: string;
      created_at: string;
      updated_at: string;
    }[];
    eventPlanAddonBox: {
      id: string;
      event_plan_id: string;
      name: string;
      price: number;
      created_at: string;
      updated_at: string;
    }[];
  }[];
  tags: {
    id: string;
    name: string;
    description: string;
    level: string;
  }[];
  comments: {
    id: string;
    event_info_id: string;
    user_id: string;
    content: string;
    created_at: string;
    updated_at: string;
  }[];
}>


export type EventStatus = "draft" | "pending" | "approved" | "reject";
export type VerificationStatus = "unverified" | "verifying" | "verified";

/* ---------- 子介面 ---------- */

export interface Host {
  id: string;
  member_info_id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  verification_status: VerificationStatus;
  photo_url: string;
  photo_background_url: string;
  created_at: string; // ISO 8601
  updated_at: string;
}

export interface EventPhoto {
  id: string;
  event_info_id: string;
  type: string; // 依需求擴充
  photo_url: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventNotice {
  id: string;
  event_info_id: string;
  type: string; // 自訂分類
  content: string;
  created_at: string;
  updated_at: string;
}

export interface EventPlanContent {
  id: string;
  event_plan_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface EventPlanAddon {
  id: string;
  event_plan_id: string;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface EventPlan {
  id: string;
  event_info_id: string;
  title: string;
  price: number;
  discounted_price: number;
  people_capacity: number;
  created_at: string;
  updated_at: string;
  /** 章節／內容區塊 */
  eventPlanContentBox: EventPlanContent[];
  /** 加購選項 */
  eventPlanAddonBox: EventPlanAddon[];
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  level: string;
}

export interface EventComment {
  id: string;
  event_info_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

/* ---------- 主介面 ---------- */

export interface EventInfo {
  id: string;
  host_info_id: string;
  title: string;
  address: string;
  description: string;
  start_time: string;                 // ISO 8601
  end_time: string;                   // ISO 8601
  max_participants: number;
  bookingCounts: number;
  cancel_policy: string;
  active: string;                
  status: string;
  registration_open_time: string;     // ISO 8601
  registration_close_time: string;    // ISO 8601
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;


  /* 關聯資料 */
  host: Host;
  photos: EventPhoto[];
  notices: EventNotice[];
  plans: EventPlan[];
  tags: Tag[];
  comments: EventComment[];
}
