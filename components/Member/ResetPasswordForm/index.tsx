"use client";
import { useForm } from "react-hook-form";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
// import toast from 'react-hot-toast';
import { memberChangePasswordSchema } from "@/schema/MemberChangePasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useResetPassword } from "@/swr/auth/useAuth";
import toast from "react-hot-toast";

export default function ResetPasswordForm() {
  // zod schema 轉換為typescript
  type FormType = z.infer<typeof memberChangePasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValidating },
  } = useForm<FormType>({
    resolver: zodResolver(memberChangePasswordSchema),
    shouldUnregister: true,
  });
  const { trigger, isMutating } = useResetPassword();

  async function onSubmit(data: FormType) {
    try {
      await trigger({ newPassword: data?.new_password });
      toast.success("更改個人密碼成功");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`更改個人密碼失敗`);
      }
    }
  }

  return (
    <div
      className="member_chang_password_form flex flex-col
    text-primary-500 border-1 border-gray-300 rounded-2xl py-3 px-6"
    >
      <div className="rules">
        <h3 className="text-2xl"> 修改密碼</h3>
        <p className="text-zinc-400 text-base">設定高強度密碼，強化帳戶安全</p>
        <p className="text-zinc-400 text-base">
          密碼須為8-20個字元，且至少包含1個數字、1個字母及1個特殊符號
        </p>
      </div>
      <form
        className="mt-9 grid grid-cols-1 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormHookInput
          label="新密碼"
          type="password"
          placeholder="請填入新密碼"
          register={register("new_password")}
          error={errors.new_password}
        />
        <FormHookInput
          label="確認新密碼"
          type="password"
          placeholder="請再次確認新密碼"
          register={register("re_password")}
          error={errors.re_password}
        />
        <button
          type="submit"
          className="btn-primary w-[150px] h-[40px] mt-auto ml-auto"
          disabled={isValidating || isMutating}
        >
          {isMutating ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "重設密碼"
          )}
        </button>
      </form>
    </div>
  );
}
