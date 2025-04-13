import axiosInstance from "@/api/axiosIntance";
import type { UserRegister } from "@/types/auth";
import { formatAxiosError } from "@/utils/erros";
const endpoint = "/auth";

export const userLogin = async () => {
  const response = await axiosInstance.post(endpoint + "/login");
  return response.data;
};

export const userVerifyToken = async () => {};

export const userRegister = async ({
  provider,
  username,
  firstname,
  lastname,
  email,
  password,
}: UserRegister) => {
  try {
    const response = await axiosInstance.post(endpoint + "/register", {
      provider,
      username,
      firstname,
      lastname,
      email,
      password,
    });
    return response.data;
  } catch (err) {
     throw formatAxiosError(err)
    };
}
