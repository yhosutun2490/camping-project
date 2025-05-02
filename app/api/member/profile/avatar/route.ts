import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import { MemberUpdateAvatarResponse } from "@/types/api/member/profile";
import { ErrorResponse } from "@/types/api/response";
import axiosInstance from "@/api/axiosIntance";

// member profile avatar 上傳
export async function POST(
  req: NextRequest
): Promise<NextResponse<MemberUpdateAvatarResponse | ErrorResponse>> {
  const accessToken = req.headers.get('access_token')
  const form = await req.formData();

  if (!accessToken) {
    return NextResponse.json(
      { status: "error", message: "取不到 token,請重新登入" },
      { status: 401 }
    );
  }

  try {
    const backEndRes = await axiosInstance.post<MemberUpdateAvatarResponse>(
      "/member/profile/avatar",
      form,
      {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      }
    );
    // response data
    const res = NextResponse.json<MemberUpdateAvatarResponse>({
      data: backEndRes.data.data,
      message: backEndRes.data.message,
      status: backEndRes.data.status,
    });

    return res;
  } catch (err: unknown) {
    const apiErr = formatAxiosError(err);
    return NextResponse.json<ErrorResponse>(
      {
        status: apiErr.status, // failed / error
        message: apiErr.message, // 錯誤訊息
      },
      { status: apiErr.httpCode } // HTTP 回傳碼
    );
  }
}
