import useSWRMutation from "swr/mutation";
import axios from "axios";
import type { UserLogin,UserLoginResponse } from "@/types/api/auth";

export function useMemberLogin() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/login', async (
        _key: string,
        { arg }: { arg: UserLogin }
      ):Promise<UserLoginResponse> => {
        const { data } = await axios.post<UserLoginResponse>("/api/auth/login", arg, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        return data
      });
    return {
        isMutating,
        trigger,
        data,
        error
    }
  }
  