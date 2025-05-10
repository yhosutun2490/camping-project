import { z } from "zod";

// 主辦單位資料表單驗證結構
export const hostProfileSchema = z.object({
  name: z.string()
    .min(2, { message: "主辦單位名稱至少需要 2 個字元" })
    .max(50, { message: "主辦單位名稱不得超過 50 個字元" }),
  
  description: z.string()
    .min(10, { message: "描述至少需要 10 個字元" })
    .max(500, { message: "描述不得超過 500 個字元" }),
  
  email: z.string()
    .email({ message: "請輸入有效的電子郵件地址" }),
  
  phone: z.string()
    .regex(/^09\d{8}$/, { message: "請輸入有效的台灣手機號碼，格式為09XXXXXXXX" }),
  
  photo: z.any()
    .refine((file) => {
      // 伺服器端渲染時跳過檢查
      if (typeof window === 'undefined') return true;
      return file instanceof File;
    }, { message: "請上傳主辦方頭像" })
    .refine((file) => {
      // 伺服器端渲染或無檔案時跳過檢查
      if (typeof window === 'undefined' || !(file instanceof File)) return true;
      return file.size <= 2 * 1024 * 1024;
    }, { message: "照片大小不得超過 2MB" })
    .optional()
    .or(z.literal(null))
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "請上傳主辦方頭像",
        });
      }
    }),
  
  photo_background: z.any()
    .refine((file) => {
      // 伺服器端渲染時跳過檢查
      if (typeof window === 'undefined') return true;
      return file instanceof File;
    }, { message: "請上傳主辦方背景圖片" })
    .refine((file) => {
      // 伺服器端渲染或無檔案時跳過檢查
      if (typeof window === 'undefined' || !(file instanceof File)) return true;
      return file.size <= 2 * 1024 * 1024;
    }, { message: "背景照片大小不得超過 2MB" })
    .optional()
    .or(z.literal(null))
    .superRefine((val, ctx) => {
      if (!val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "請上傳主辦方背景圖片",
        });
      }
    }),
  
  photo_url: z.string().optional(),
  photo_background_url: z.string().optional()
});

// 轉換成 TypeScript 型別使用
export type HostProfileFormType = z.infer<typeof hostProfileSchema>;
