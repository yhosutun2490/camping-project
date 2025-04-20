
import axiosInstance from "@/api/axiosIntance";
import type { UserLogin, UserRegister } from "@/types/api/auth";
import { formatAxiosError } from "@/utils/erros";
const endpoint = "/auth";

/**
 * 使用者登入 API 請求
 * 回傳登入成功後的使用者資料
 */
export const userLogin = async ({password, email }: UserLogin) => {
  const response = await axiosInstance.post(endpoint + "/login", {
    password,
    email
  });
  return response.data;
};

/**
 * 使用者註冊 API 請求
 */
export const userRegister = async ({
  provider,
  username,
  firstname,
  lastname,
  phone,
  email,
  password,
}: UserRegister) => {
  try {
    const response = await axiosInstance.post(endpoint + "/register", {
      provider,
      username,
      firstname,
      lastname,
      phone,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw formatAxiosError(err);
  }
};


/**
 * 使用者登出 API 請求
 * 清空使用者cookies資料
 */

export const userLogout = async () => {
  const response = await axiosInstance.post(endpoint + "/logout", );
  return response.data;
}

/**
 * 使用者刷新token
 */
export const userRefreshToken = async () => {
  const response = await axiosInstance.post(endpoint + "/refresh", );
  return response.data;
}


