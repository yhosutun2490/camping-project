import { userRegister } from '@/api/auth'
import { UserRegister, UserRegisterResponse, UserLogoutResponse } from '@/types/api/auth'
import axios from "axios";
import useSWRMutation from 'swr/mutation'

// 改用Next api route 

export function useCreateMember() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/register', async (
        _key: string,
        { arg }: { arg: UserRegister }
      ):Promise<UserRegisterResponse> => {
         const data = await userRegister(arg)
         return data
      });

    return {
        isMutating,
        trigger,
        data,
        error
    }
}

// logout 不用帶 body 
export function useUserLogout() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/logout",
    async (
      _key: string,
      { arg }: { arg: null}
    ):Promise<UserLogoutResponse> => {
      const res = await axios.post<UserLogoutResponse>("/api/auth/logout",arg, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data
    }
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}