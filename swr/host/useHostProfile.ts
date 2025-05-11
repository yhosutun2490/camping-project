import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { CreateHostProfileRequest, HostProfileResponse } from "@/types/api/host";
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