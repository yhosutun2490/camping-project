import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ required_error: "Email為必填" }).email("Email格式錯誤"),
  password: z
    .string({
      required_error: "密碼為必填",
    })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "密碼需至少8位，且包含英文字母與數字"
    ),
});

export const registerSchema = z.object({
  username: z
    .string({ required_error: "帳戶名稱為必填" })
    .max(16, { message: "最多16字元" }),
  firstname: z
    .string({ required_error: "姓名為必填" })
    .max(16, { message: "最多16字元" }),
  lastname: z
    .string({ required_error: "姓氏為必填" })
    .max(16, { message: "最多16字元" }),
  phone: z
    .string({ required_error: "電話號碼為必填" })
    .max(72, { message: "最多72字元" }),
  email: z.string({ required_error: "Email為必填" }).email("Email格式錯誤"),
  password: z
    .string({
      required_error: "密碼為必填",
    })
    .max(16, { message: "密碼最多16字元" })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "密碼需至少8位，且包含英文字母與數字"
    ),
});
