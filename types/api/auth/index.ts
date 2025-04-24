import {
  SuccessResponse,
  ErrorResponse,
  SuccessResponseNoData,
} from "@/types/api/response";

// 定義 UserLogin 型別
export interface UserLogin {
  provider: "local" | "google";
  password: string;
  email: string;
}
export type UserLoginResponse =
  | SuccessResponse<{
      member_info: {
        id: string;
        username: string;
        firstname: string;
        lastname: string;
        email: string;
        role: "member" | "host" | "admin";
      };
    }>
  | ErrorResponse;

export interface UserRegister extends UserLogin {
  username: string;
  phone: string;
  firstname: string;
  lastname: string;
}

export type UserRegisterResponse = SuccessResponseNoData | ErrorResponse;

export type UserRefreshTokenResponse = SuccessResponseNoData | ErrorResponse;

export type UserLogoutResponse = SuccessResponseNoData | ErrorResponse;

export type UserCheckResponse =
  | SuccessResponse<{
      member_info: {
        id: string;
        username: string;
        email: string;
        role: string;
      };
    }>
  | ErrorResponse;
