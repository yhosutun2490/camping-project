import { userRegister } from '@/api/auth'
import type { UserRegister } from '@/types/auth'
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
