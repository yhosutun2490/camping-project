import { z } from "zod";

export const memberChangePasswordSchema = z
  .object({
    old_password: z
      .string({
        required_error: "密碼為必填",
      })
      .min(1, { message: "舊密碼為必填" })
      .max(16, { message: "密碼最多16字元" })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "密碼需至少8位，且包含英文字母與數字"
      ),
    new_password: z
      .string({
        required_error: "新密碼為必填",
      })
      .min(1, { message: "新密碼為必填" })
      .max(16, { message: "密碼最多16字元" })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "密碼需至少8位，且包含英文字母與數字"
      ),
    re_password: z
      .string({
        required_error: "確認新密碼欄位為必填",
      })
      .min(1, { message: "確認新密碼欄位為必填" })
      .max(16, { message: "密碼最多16字元" })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "密碼需至少8位，且包含英文字母與數字"
      ),
  })
  .refine((data) => data.new_password === data.re_password, {
    message: "新密碼輸入不一致",
    path: ["re_password"], // 錯誤會加在 re_password 欄位上
  });
