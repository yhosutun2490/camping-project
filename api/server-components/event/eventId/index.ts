import axiosInstance from "@/api/axiosIntance";
import type { GetApiV1EventsEventIdResponse } from "@/types/api/event/eventById";
import { formatAxiosError } from "@/utils/errors";
import { AxiosResponse } from "axios";

/**
 * 取得單一活動資訊
 */
export const getEventById = async (
  id: string
): Promise<GetApiV1EventsEventIdResponse["data"] | null> => {
  try {
    const response: AxiosResponse<GetApiV1EventsEventIdResponse> = await axiosInstance.get(
      `/events/${id}`
    );
    return response.data.data;
  } catch (err) {
    formatAxiosError(err);
    return null;
  }
};