import { userRegister, userLogout } from '@/api/auth'
import { UserRegister, UserRegisterResponse, UserLogoutResponse } from '@/types/api/auth'
import useSWRMutation from 'swr/mutation'



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


export function useUserLogout() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/logout",
    async ():Promise<UserLogoutResponse> => await userLogout()
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}