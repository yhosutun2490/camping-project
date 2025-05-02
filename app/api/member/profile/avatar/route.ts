import { NextRequest, NextResponse } from "next/server";
import { formatAxiosError } from "@/utils/errors";
import { MemberUpdateAvatarResponse } from "@/types/api/member/profile";
import { ErrorResponse } from "@/types/api/response";
import nextApiInstance from "@/api/axiosIntance/nextApiInstance";

// member profile avatar 上傳
export async function POST(
  req: NextRequest
): Promise<NextResponse<MemberUpdateAvatarResponse | ErrorResponse>> {
  const form = await req.formData()
  try {
    const backEndRes = await nextApiInstance.post<MemberUpdateAvatarResponse>(
      "/member/profile/avatar",
      form
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
