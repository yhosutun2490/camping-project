import { SuccessResponse, SuccessResponseNoData } from "@/types/api/response";

// 定義 UserLogin 型別
export interface UserLogin {
  provider: "local" | "google";
  password: string;
  email: string;
}
export type MemberData = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "member" | "host" | "admin" | "";
};
export type UserLoginResponse = SuccessResponse<{
  member: MemberData;
}>;

export interface UserRegister extends UserLogin {
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
}

export type UserRegisterResponse = SuccessResponseNoData;

export type UserRefreshTokenResponse = SuccessResponseNoData;

export type UserLogoutResponse = SuccessResponseNoData;


export type UserCheckData = {
  id: string;
  username: string;
  email: string;
  role: "member" | "host" | "admin" | "";
};
export type UserCheckResponse = SuccessResponse<{
  member: UserCheckData
}>;
