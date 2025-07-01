import { SuccessResponseNoData } from "@/types/api/response";

// 申請下架活動請求參數介面
export interface RequestUnpublishEventRequest {
  reason: string;
}

// 申請下架活動回應介面
export type RequestUnpublishEventResponse = SuccessResponseNoData;
