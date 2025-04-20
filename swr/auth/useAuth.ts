import { userRegister, userLogin, userLogout } from '@/api/auth'
import { UserRegister, UserLogin } from '@/types/api/auth'
import useSWRMutation from 'swr/mutation'



export function useCreateMember() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/register', async (
        _key: string,
        { arg }: { arg: UserRegister }
      ) => {
        return await userRegister(arg)
      });
    return {
        isMutating,
        trigger,
        data,
        error
    }
}

export function useMemberLogin() {
  const { isMutating, trigger, error, data } = useSWRMutation('/api/auth/login', async (
      _key: string,
      { arg }: { arg: UserLogin }
    ) => {
      return await userLogin(arg)
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
    async () => await userLogout()
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}