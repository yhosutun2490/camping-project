// 定義活動標籤的型別
import { SuccessResponse } from '../response';

// 活動標籤型別
export interface EventTag {
  id: string;
  name: string;
  description: string;
  level: string;
  created_at: string;
}

// 回應型別
export interface EventTagsData {
  eventTags: EventTag[];
}

export type EventTagsResponse = SuccessResponse<EventTagsData>;
