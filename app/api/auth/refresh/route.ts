import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { isAxiosError } from "axios";
import { UserRefreshTokenResponse } from "@/types/api/auth/index";

export async function POST(req: NextRequest):Promise<NextResponse<UserRefreshTokenResponse>> {
  try {
    const cookieHeader = req.headers.get("cookie") ?? "";
    // 不須body參數，但須夾帶cookies
    const backEndRes = await axiosInstance.post("/auth/refresh", {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      });


     // response data
     const res = NextResponse.json<UserRefreshTokenResponse>({
      message: backEndRes.data.message,
      status: backEndRes.data.status
    });

    return res;
  } catch (err) {
    console.log("api err", err);
    if (isAxiosError(err)) {
      const status = err.response?.status || 500;
      const message =
        (err.response?.data as { message?: string })?.message ||
        err.message ||
        "伺服器錯誤，請稍後再試";
      const errorPayload: UserRefreshTokenResponse = {
          status: "failed",       
          message: message, 
      };
      return NextResponse.json(errorPayload, {status});
    }

    return NextResponse.json<UserRefreshTokenResponse>(
      { status: "error", message: "伺服器錯誤" },
      { status: 500 }
    );
  }
}