import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    // 取出body參數
    const body = await req.json();
    const backEndRes = await axiosInstance.post("/auth/login", body);

    // 從後端 response 拿 cookie
    const setCookies = backEndRes.headers["set-cookie"];


     // response data
     const res = NextResponse.json({
      message: backEndRes.data.message,
      data: backEndRes.data.data,
      status: backEndRes.data.status
    });

    // 手動轉發 cookies
    if (setCookies) {
      const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
      for (const cookie of cookieArray) {
        res.headers.append("Set-Cookie", cookie); // ✅ 寫入瀏覽器
      }
    }

  
    return res;
  } catch (err) {
    console.log("api err", err);
    if (isAxiosError(err)) {
      const status = err.response?.status || 500;
      const message =
        (err.response?.data as { message?: string })?.message ||
        err.message ||
        "伺服器錯誤，請稍後再試";
      return NextResponse.json({ message}, {status});
    }

    return NextResponse.json(
      {message: "未知錯誤，請稍後再試"},
      {status: 500}
    );
  }
}
