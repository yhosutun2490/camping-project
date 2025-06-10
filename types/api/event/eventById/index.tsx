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