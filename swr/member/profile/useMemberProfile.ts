import { memberUpdateProfile, memberUpdateAvatar } from '@/api/member/profile'
import { MemberUpdateProfileResponse, MemberProfile, MemberUpdateAvatarResponse } from '@/types/api/member/profile'
import useSWRMutation from 'swr/mutation'


export function useUpdateMemberProfile() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/member/profile/update', async (
        _key: string,
        { arg }: { arg: MemberProfile }
      ):Promise<MemberUpdateProfileResponse> => {
         const data  = await memberUpdateProfile(arg)
         return data
      });

    return {
        isMutating,
        trigger,
        data,
        error
    }
}

export function useUpdateMemberAvatar() {
    const { isMutating, trigger, error, data } = useSWRMutation('/api/member/profile/avatar-update', async (
        _key: string,
        { arg }: { arg: File }
      ):Promise<MemberUpdateAvatarResponse> => {
         const data  = await memberUpdateAvatar(arg)
         return data
      },
       { throwOnError: true }   
    );

    return {
        isMutating,
        trigger,
        data,
        error
    }
}
