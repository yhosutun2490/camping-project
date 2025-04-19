import axiosInstance from "@/api/axiosIntance";
import axios from "axios";
import { cookies } from "next/headers";
import { UserRole } from "@/types/page/main/user";
const endpoint = "/auth";

type ApiResponse<T> = {
  data: {
    member: T;
  };
  message: string;
  status: string;
};

export const userVerifyToken = async (): Promise<UserRole | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    const response = await axiosInstance.get<ApiResponse<UserRole>>(
      endpoint + "/check",
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      }
    );
    return response.data.data.member;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const isInvalidToken = err.response?.data?.message === "INVALID_TOKEN";
      console.warn("token valid err", isInvalidToken);
    } else {
      console.warn("非 Axios 錯誤", err);
    }
    return null;
  }
};
