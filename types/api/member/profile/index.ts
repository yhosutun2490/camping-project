import {
    SuccessResponse,
  } from "@/types/api/response";

export interface MemberInfo {
    id: string,
    firstname: string,
    lastname: string,
    username: string,
    birth: string,
    gender: string,
    phone: string,
    email: string,
    role: string,
    photo_url: string,
    is_verified: boolean,
  }

  export type MemberGetProfileResponse = SuccessResponse<{
    member: MemberInfo
  }>;