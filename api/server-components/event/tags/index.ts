import axiosInstance from "@/api/axiosIntance";
import type { GetApiV1MetaEventTags200Data } from "@/types/services/EventTags"
import { formatAxiosError } from "@/utils/errors";
import { ErrorResponse } from "@/types/api/response";
const endpoint = "/meta/event-tags";

/**
 * 取得所有活動分類標籤
 */
export const getEventTags = async (): Promise<GetApiV1MetaEventTags200Data> => {
  try {
    const {data}= await axiosInstance.get<GetApiV1MetaEventTags200Data>(
      endpoint,
    );
    console.log('api活動標籤', data)
    return data ;
  } catch (err) {
    formatAxiosError(err) as ErrorResponse
    return [] as unknown as GetApiV1MetaEventTags200Data;
  }
};
