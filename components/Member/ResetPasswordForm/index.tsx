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
    text-primary-500"
    >
      <form
        className="grid grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="rules">
          <p className="heading-2 text-primary-700"> 修改密碼</p>
          <div className="btn-wrap h-[61px] flex justify-between items-center border-b-1 border-primary-300">
            <span className="text-sm text-neutral-700">
              設定高強度密碼，強化帳戶安全
            </span>
            <button
              type="submit"
              className="text-primary-700 rounded-2xl border-2 border-primary-700 
          w-[100px] h-[40px] col-span-2 justify-self-end 
          cursor-pointer hover:bg-primary-500 hover:text-white"
              disabled={isValidating || isMutating}
            >
              {isMutating ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "重設密碼"
              )}
            </button>
          </div>
          <p className="text-primary-500 text-sm my-4">
            密碼須為8-20個字元，且至少包含1個數字、1個字母及1個特殊符號
          </p>
        </div>
        <FormHookInput
          label="新密碼"
          type="password"
          placeholder="請填入新密碼"
          register={register("new_password")}
          error={errors.new_password}
          className="md:w-1/2"
        />
        <FormHookInput
          label="確認新密碼"
          type="password"
          placeholder="請再次確認新密碼"
          register={register("re_password")}
          error={errors.re_password}
          className="md:w-1/2"
        />
      </form>
    </div>
  );
}
