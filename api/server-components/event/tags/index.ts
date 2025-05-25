import axiosInstance from "@/api/axiosIntance";
import type { GetApiV1MetaEventTags200Data } from "@/types/services/EventTags"
import { formatAxiosError } from "@/utils/errors";
import { ErrorResponse } from "@/types/api/response";
const endpoint = "/meta/event-tags";

/**
 * 取得所有活動分類標籤
 */

type GetEventTagsResponse = {
  status: string;
  message: string;
  data: GetApiV1MetaEventTags200Data;
};

export const getEventTags = async (): Promise<GetApiV1MetaEventTags200Data> => {
  try {
    const response = await axiosInstance.get<GetEventTagsResponse>(endpoint);
    return response.data.data;
  } catch (err) {
    formatAxiosError(err) as ErrorResponse;
    return [] as unknown as GetApiV1MetaEventTags200Data;
  }
};
