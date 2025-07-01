import axiosInstance from "@/api/axiosIntance";
import type { GetRecommendSuccessResponse} from "@/types/api/event/recommend"
import { formatAxiosError } from "@/utils/errors";
import { AxiosResponse } from "axios";

/**
 * 取得推薦活動資訊
 */
export const getRecommendEvents = async (): Promise<GetRecommendSuccessResponse["data"] | null> => {
  try {
    const response: AxiosResponse<GetRecommendSuccessResponse> = await axiosInstance.get(
      `/events/recommend`
    );
    return response.data.data;
  } catch (err) {
    formatAxiosError(err);
    return null;
  }
};