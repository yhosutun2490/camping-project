import { z } from "zod";

export const memberInfoSchema = z.object({
  username: z
    .string({ required_error: "帳戶名稱為必填" })
    .min(1, { message: "帳戶名稱為必填" })
    .max(16, { message: "最多16字元" }),
  firstname: z
    .string({ required_error: "姓名為必填" })
    .min(1, { message: "姓名為必填" })
    .max(16, { message: "最多16字元" }),
  lastname: z
    .string({ required_error: "姓氏為必填" })
    .min(1, { message: "姓氏為必填" })
    .max(16, { message: "最多16字元" }),
  phone: z
    .string({ required_error: "電話號碼為必填" })
    .min(1, { message: "電話號碼為必填" })
    .max(72, { message: "最多72字元" }),
  email: z.string({ required_error: "Email為必填" }).email("Email格式錯誤"),
  gender: z.enum(["male", "female"]).nullable().optional(),
  photo_url: z
    .string()
    .url({ message: "photo_url 必須是有效的 URL" })
    .nullable()
    .optional(),
  birth: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        if (!val) return true; // ⬅️ 空值時通過驗證（optional）
        return /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val));
      },
      { message: "birth 必須是 yyyy-mm-dd 格式的有效日期" }
    ),
});
