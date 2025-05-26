"use client";
import { useForm } from "react-hook-form";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
// import toast from 'react-hot-toast';
import { memberChangePasswordSchema } from "@/schema/MemberChangePasswordForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRestPasswordByToken } from "@/swr/auth/useAuth";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordTokenForm() {
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
  const { trigger, isMutating } = useRestPasswordByToken();
  const searchParams = useSearchParams();
  const router = useRouter();
  const resetId = searchParams.get("resetId") as string;

  async function onSubmit(data: FormType) {
    if (!resetId) {
      toast.error(`缺少reset token，請重開啟信件連結`);
      return;
    }
    try {
      await trigger({ token: resetId, newPassword: data?.new_password });
      toast.success("更改個人密碼成功");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400) {
          toast.error("連結已失效，請重新發送");
        } else {
          toast.error("伺服器錯誤，請稍後再試");
        }
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    }
  }

  return (
    <div
      className="reset_password_token_form bg-white flex flex-col
    text-primary-500 border-1 border-gray-300 rounded-2xl py-3 px-6"
    >
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
