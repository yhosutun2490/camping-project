import axios from 'axios';
import { memberUpdateProfile } from '@/api/member/profile'
import { MemberUpdateProfileResponse, MemberProfile, MemberUpdateAvatarResponse } from '@/types/api/member/profile'
import useSWRMutation from 'swr/mutation'


export function useUpdateMemberProfile() {
    const { isMutating, trigger, error, data } = 
    useSWRMutation<MemberUpdateProfileResponse,
    Error,
    string, 
    MemberProfile
    >('/api/member/profile/update', async (_key: string, { arg: payload }: { arg: MemberProfile })=> {
         const data  = await memberUpdateProfile(payload)
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
        const formData = new FormData();
        formData.append("file", arg);
  
         const res = await axios.post<MemberUpdateAvatarResponse>("/api/member/profile/avatar",formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
         return res.data
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
