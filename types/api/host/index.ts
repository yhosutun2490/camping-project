// 主辦單位 API 相關型別定義

import { SuccessResponse } from '../response';

// 主辦單位資料模型
export interface HostProfile {
  /** 主辦方 id */
  id: string;
  /** 會員 id */
  member_id: string;
  /** 主辦方名稱 */
  name: string;
  /** 主辦方描述 */
  description: string;
  /** 主辦方電子郵件 */
  email: string;
  /** 主辦方電話 */
  phone: string;
  /** 主辦方頭像 */
  photo_url?: string;
  /** 主辦方背景圖片 */
  photo_background_url?: string;
  /** 主辦方狀態 */
  verification_status?: 'pending' | 'verified' | 'rejected';
  updated_at?: string;
}

// 主辦單位創建請求體 (For API call)
export interface CreateHostProfileRequest {
  /** 主辦方名稱 */
  name: string;
  /** 主辦方描述 */
  description: string;
  /** 主辦方電子郵件 */
  email: string;
  /** 主辦方電話 */
  phone: string;
  /** 主辦方頭像 */
  photo_url: string;
  /** 主辦方背景圖片 */
  photo_background_url: string;
}

// 更新主辦方資料請求體
export type UpdateHostProfileRequest = Partial<CreateHostProfileRequest>;

// 上傳圖片回應
export type UploadImageResponse = SuccessResponse<{
  photo_url: string;
}>;

// 主辦單位 API 回應
export type HostProfileResponse = SuccessResponse<{
  host_info: HostProfile;
}>;
