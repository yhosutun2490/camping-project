import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/api/axiosIntance";

import type { ErrorResponse } from "@/types/api/response";
import { formatAxiosError } from "@/utils/errors";
import { CreateHostProfileRequest, HostProfileResponse, GetHostProfileResponse, UpdateHostProfileRequest } from "@/types/api/host";

// 處理主辦單位註冊請求
export async function POST(
  request: NextRequest
): Promise<NextResponse<HostProfileResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析 JSON 請求體
    const profileData: CreateHostProfileRequest = await request.json();

    try {
      // 調用 API
      const response = await axiosInstance.post<HostProfileResponse>("/host/profile", profileData, {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      });

      // 從後端 response 獲取 cookie
      const setCookies = response.headers["set-cookie"];
      
      // 創建回應
      const res = NextResponse.json(response.data, { status: 201 });
      
      // 如果後端返回了 cookie（包含新的 access_token 和角色信息），將其傳遞給客戶端
      if (setCookies) {
        const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
        for (const cookie of cookieArray) {
          res.headers.append("Set-Cookie", cookie);
        }
      }
      
      return res;
    } catch (error: unknown) {
      // 處理 Axios 錯誤，使用格式化工具
      const apiErr = formatAxiosError(error);
      
      // 保持與 API 文檔一致的錯誤回應格式
      if (apiErr.httpCode === 409) {
        return NextResponse.json(
          { status: "failed", message: "您已經創建過主辦方資料" },
          { status: 409 }
        );
      } else if (apiErr.httpCode === 400) {
        return NextResponse.json(
          { status: "failed", message: apiErr.message || "請填寫主辦方名稱、電話、Email、大頭貼等必填欄位" },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("處理主辦單位註冊時發生錯誤:", error);
    return NextResponse.json(
      { status: "error", message: "伺服器錯誤" },
      { status: 500 }
    );
  }
}

// 獲取主辦單位資料
export async function GET(
  request: NextRequest
): Promise<NextResponse<GetHostProfileResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    try {
      // 調用 API
      const response = await axiosInstance.get<GetHostProfileResponse>("/host/profile", {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        withCredentials: true,
      });

      // 創建回應
      const res = NextResponse.json(response.data, { status: 200 });
      
      
      return res;
    } catch (error: unknown) {
      // 處理 Axios 錯誤，使用格式化工具
      const apiErr = formatAxiosError(error);
      
      // 保持與 API 文檔一致的錯誤回應格式
      if (apiErr.httpCode === 404) {
        return NextResponse.json(
          { status: "failed", message: "尚未建立主辦方資料" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("獲取主辦單位資料時發生錯誤:", error);
    return NextResponse.json(
      { status: "error", message: "伺服器錯誤，無法取得主辦方資料" },
      { status: 500 }
    );
  }
}

// 更新主辦單位資料
export async function PATCH(
  request: NextRequest
): Promise<NextResponse<HostProfileResponse | ErrorResponse>> {
  try {
    // 檢查用戶是否已登入
    const accessToken = request.headers.get('access_token');
    if (!accessToken) {
      return NextResponse.json(
        { status: "failed", message: "請先登入會員" },
        { status: 401 }
      );
    }

    // 解析 JSON 請求體
    const updateData: UpdateHostProfileRequest = await request.json();

    try {
      // 調用 API
      const response = await axiosInstance.patch<HostProfileResponse>("/host/profile", updateData, {
        headers: {
          Cookie: `access_token=${accessToken}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      // 從後端 response 獲取 cookie
      const setCookies = response.headers["set-cookie"];
      
      // 創建回應
      const res = NextResponse.json(response.data, { status: 200 });
      
      // 如果後端返回了 cookie，將其傳遞給客戶端
      if (setCookies) {
        const cookieArray = Array.isArray(setCookies) ? setCookies : [setCookies];
        for (const cookie of cookieArray) {
          res.headers.append("Set-Cookie", cookie);
        }
      }
      
      return res;
    } catch (error: unknown) {
      // 處理 Axios 錯誤，使用格式化工具
      const apiErr = formatAxiosError(error);
      
      // 保持與 API 文檔一致的錯誤回應格式
      if (apiErr.httpCode === 404) {
        return NextResponse.json(
          { status: "failed", message: "尚未建立主辦方資料" },
          { status: 404 }
        );
      } else if (apiErr.httpCode === 400) {
        return NextResponse.json(
          { status: "failed", message: apiErr.message || "資料驗證錯誤" },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          { status: apiErr.status, message: apiErr.message },
          { status: apiErr.httpCode }
        );
      }
    }
  } catch (error) {
    console.error("更新主辦單位資料時發生錯誤:", error);
    return NextResponse.json(
      { status: "error", message: "伺服器錯誤，無法更新主辦方資料" },
      { status: 500 }
    );
  }
}
