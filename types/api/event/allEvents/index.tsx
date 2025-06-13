import { SuccessResponse } from "@/types/api/response";

export type EventPlan = {
  title: string;
  price: number;
  people_capacity: number;
};

export type Event = {
  id: string;
  title: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
  address: string;
  plans: EventPlan[];
  photos: string[];
  tags: string[];
  levels: ("easy" | "medium" | "hard")[]; // 可依實際情況擴充
};


export interface Pagination {
    page: number,
    per: number,
    total: number,
    total_pages: number,
    sort?: "asc" | "desc";
}

export type EventListResponse = SuccessResponse<{
  pagination:Pagination,
  events: Event[]
}>;

/**
 * GET /events
 */
export interface GetEventsParams {
  start_time?: string;
  end_time?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  people?: number;
  page?: number;
  per?: number;
  sort?: "asc" | "desc";
}
