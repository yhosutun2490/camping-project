import {
  UserRegister,
  UserRegisterResponse,
  UserLogoutResponse,
} from "@/types/api/auth";
import {
  PutAuthResetPassword200,
  PutAuthResetPasswordBody,
  PostAuthForgotPassword200,
  PostAuthForgotPasswordBody,
  PostAuthResetPasswordByTokenBody,
  PostAuthResetPasswordByToken200,
  GetApiV1AuthOauthGoogleResult
} from "@/types/services/Auth";
import axios from "axios";
import axiosInstance from "@/api/axiosIntance";
import useSWRMutation from "swr/mutation";

// 改用Next api route

export function useCreateMember() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    "/api/auth/register",
    async (
      _key: string,
      { arg }: { arg: UserRegister }
    ): Promise<UserRegisterResponse> => {
      const res = await axios.post<UserLogoutResponse>(
        "/api/auth/register",
        arg,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

// logout 不用帶 body
export function useUserLogout() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/logout",
    async (
      _key: string,
      { arg }: { arg: null }
    ): Promise<UserLogoutResponse> => {
      const res = await axios.post<UserLogoutResponse>(
        "/api/auth/logout",
        arg,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    }
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}

// reset password

export function useResetPassword() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/reset-password",
    async (
      _key: string,
      { arg }: { arg: PutAuthResetPasswordBody }
    ): Promise<PutAuthResetPassword200> => {
      const res = await axios.put<PutAuthResetPassword200>(
        "/api/auth/reset-password",
        arg,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    }
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}

// forget password send email
export function useForgetPasswordSendEmail() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/forgot-password",
    async (
      _key: string,
      { arg }: { arg: PostAuthForgotPasswordBody }
    ): Promise<PostAuthForgotPassword200> => {
      const res = await axios.post<PostAuthForgotPassword200>(
        "/api/auth/forgot-password",
        arg,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    }
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}

// reset password py page token

export function useRestPasswordByToken() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/reset-password-by-token",
    async (
      _key: string,
      { arg }: { arg: PostAuthResetPasswordByTokenBody }
    ): Promise<PostAuthResetPasswordByToken200> => {
      const res = await axiosInstance.post<PostAuthResetPasswordByToken200>(
        "/auth/reset-password-by-token",
        arg,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    }
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}

export function useOAuthGoogle() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    "/api/auth/oauth/google",
    async (
      _key: string,
      { arg }: { arg: undefined }
    ): Promise<GetApiV1AuthOauthGoogleResult> => {
      const res = await axios.get<GetApiV1AuthOauthGoogleResult>(
        "/api/auth/oauth/google",
        arg,
      );
      return res.data;
    }
  );

  return {
    trigger,
    isMutating,
    data,
    error,
  };
}
