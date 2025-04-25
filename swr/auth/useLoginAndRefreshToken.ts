import useSWRMutation from "swr/mutation";
import axios from "axios";
import type { UserLogin,UserLoginResponse, UserRefreshTokenResponse } from "@/types/api/auth";

export function useMemberLogin() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/login', async (
        _key: string,
        { arg }: { arg: UserLogin }
      ):Promise<UserLoginResponse> => {
        // next.js api route
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

export function useMemberRefreshToken() {
  const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/refresh', async (
    _key: string,
    { arg }: { arg: null}
  ):Promise<UserRefreshTokenResponse> => {
    // next.js api route
    const { data } = await axios.post<UserRefreshTokenResponse>("/api/auth/refresh", arg, {
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