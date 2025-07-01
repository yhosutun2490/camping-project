import { SuccessResponse } from "@/types/api/response";

export type EventItem = {
  id: string;
  title: string;
  description: string;
  price: number,
  discounted_price: number,
  address: string,
  start_time?: string;
  end_time?: string;
  total_signup?: number;
  max_participants?: number;
  photos: string[];
};
export type topPlacesEvents = Record<string, EventItem[]>

type EventAPIResponse = {
  popularEvents: EventItem[];
  groupedEvents: Record<string, EventItem[]>;
};

export type GetRecommendSuccessResponse = SuccessResponse<EventAPIResponse>