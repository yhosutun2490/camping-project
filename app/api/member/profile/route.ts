import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import { MemberProfile,MemberUpdateProfileResponse} from "@/types/api/member/profile";
import { ErrorResponse } from "@/types/api/response";
import axiosInstance from "@/api/axiosIntance";

// member profile update 個人資料
export async function PATCH(
  req: NextRequest
): Promise<NextResponse<MemberUpdateProfileResponse | ErrorResponse>> {
  const {firstname, lastname,gender,username, birth, photo_url} = await req.json() as MemberProfile
  const accessToken = req.headers.get('access_token')
   if (!accessToken) {
     return NextResponse.json(
       { status: "error", message: "取不到 token,請重新登入" },
       { status: 401 }
     );
   }
  
   const payload: Record<string, unknown> = {
    firstname,
    lastname,
    gender,
    username,
    birth,
    photo_url
  }
  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== "")
  )
  try {
    const backEndRes = await axiosInstance.patch<MemberUpdateProfileResponse>(
      "/member/profile",
      cleanPayload,
      {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      }
    );
    // response data
    const res = NextResponse.json<MemberUpdateProfileResponse>({
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
