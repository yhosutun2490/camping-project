import { SuccessResponse } from '@/types/api/response';

// 提交活動審核請求參數
export interface SubmitEventRequest {
  eventId: string;
}

// 提交活動審核回應資料
export interface SubmitEventData {
  eventId: string;
  status: 'pending';
}

// 提交活動審核回應
export type SubmitEventResponse = SuccessResponse<SubmitEventData>;
