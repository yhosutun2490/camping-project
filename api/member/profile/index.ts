import axiosInstance from "@/api/axiosIntance";
import { formatAxiosError } from "@/utils/errors";
import { MemberProfile, MemberUpdateProfileResponse, MemberUpdateAvatarResponse } from "@/types/api/member/profile"
const endpoint = "/member/profile";

/**
 * 會員編輯資料API 請求
 */
export const memberUpdateProfile = async ({
    username,
    firstname,
    lastname,  
    birth,
    gender,
    photo_url,
  }: MemberProfile):Promise<MemberUpdateProfileResponse> => {
    try {
      const response = await axiosInstance.patch<MemberUpdateProfileResponse>(endpoint , {
        username,
        firstname,
        lastname,  
        birth,
        gender,
        photo_url,
      });
      return response.data;
    } catch (err) {
      throw formatAxiosError(err);
    }
  };
  
 /**
 * @param avatar 大頭照檔案
 * 會員上傳大頭照 API 請求
 */
  export const memberUpdateAvatar = async (
    avatar:File
  ):Promise<MemberUpdateAvatarResponse> => {
    try {
      const form = new FormData();
      form.append("file", avatar);
      const response = await axiosInstance.post<MemberUpdateAvatarResponse>(endpoint + '/avatar', 
        form,
      );
      return response.data;
    } catch (err) {
      throw formatAxiosError(err);
    }
  };
  