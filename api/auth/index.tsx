import axiosInstance from "@/api/axiosIntance";
import type { UserLogin, UserRegister } from "@/types/auth";
import { formatAxiosError } from "@/utils/erros";
const endpoint = "/auth";

export const userLogin = async ({ username, password, email }: UserLogin) => {
  const response = await axiosInstance.post(endpoint + "/login", {
    username,
    password,
    email
  });
  return response.data;
};


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
    throw formatAxiosError(err);
  }
};

export const userVerifyToken = async ({}) => {};
