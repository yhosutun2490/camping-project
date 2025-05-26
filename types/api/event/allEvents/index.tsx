import { SuccessResponse } from "@/types/api/response";

export interface Event {
    id: string,
    title: string,
    start_time: string,
    end_time: string,
    address: string,
    price: string,
    photos: string[],
    tags: string[],
}

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
  startTime?: string;
  endTime?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  people?: number;
  page?: number;
  per?: number;
  sort?: "asc" | "desc";
}
