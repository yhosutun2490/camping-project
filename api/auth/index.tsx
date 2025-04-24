
import axiosInstance from "@/api/axiosIntance";
import type { UserRegister,UserRegisterResponse } from "@/types/api/auth";
import { formatAxiosError } from "@/utils/erros";
const endpoint = "/auth";



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
}: UserRegister):Promise<UserRegisterResponse> => {
  try {
    const response = await axiosInstance.post<UserRegisterResponse>(endpoint + "/register", {
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



