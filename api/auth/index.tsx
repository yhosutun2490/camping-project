
import axiosInstance from "@/api/axiosIntance";
import type { UserLogin, UserRegister } from "@/types/api/auth";
import { formatAxiosError } from "@/utils/erros";
const endpoint = "/auth";

export const userLogin = async ({password, email }: UserLogin) => {
  const response = await axiosInstance.post(endpoint + "/login", {
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

export const userLogout = async () => {
  const response = await axiosInstance.post(endpoint + "/logout", );
  return response.data;
}

