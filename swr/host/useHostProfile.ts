import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import axios from 'axios';
import { CreateHostProfileRequest, HostProfileResponse, GetHostProfileResponse } from "@/types/api/host";
import toast from 'react-hot-toast';

// 建立主辦單位資料 API
export function useCreateHostProfile() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/host/profile/create",
    async (_key: string, { arg: payload }: { arg: CreateHostProfileRequest }) => {
      try {
        const response = await axios.post<HostProfileResponse>("/api/host/profile", payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        toast.success("主辦方資料建立成功");
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.message || "主辦方資料建立失敗";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        throw new Error("主辦方資料建立發生錯誤");
      }
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

// 獲取主辦單位資料 API
export function useGetHostProfile() {
  const { data, error, isLoading, mutate } = useSWR<GetHostProfileResponse>(
    "/api/host/profile",
    async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          // 404 表示尚未建立主辦方資料，不顯示錯誤提示
          if (error.response.status !== 404) {
            const errorMessage = error.response.data.message || "無法取得主辦方資料";
            toast.error(errorMessage);
          }
          throw error;
        }
        throw new Error("取得主辦方資料發生錯誤");
      }
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  return {
    hostProfile: data?.data?.host_info,
    isLoading,
    error,
    mutate,
  };
}