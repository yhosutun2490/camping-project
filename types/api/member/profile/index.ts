import {
    SuccessResponse,
  } from "@/types/api/response";

export interface MemberProfile {
  firstname: string,
  lastname: string,
  username: string,
  birth?: string,
  gender?: string,
  photo_url?: string,
 }
export interface MemberInfo extends MemberProfile {
    id: string,
    phone: string,
    email: string,
    role: string,
    is_verified: boolean,
  }

export type MemberGetProfileResponse = SuccessResponse<{
  member: MemberInfo
}>;

export type MemberUpdateProfileResponse = SuccessResponse<{
  member: MemberInfo
}>;

export type MemberUpdateAvatarResponse = SuccessResponse<{
  avatar_url: string
}>

