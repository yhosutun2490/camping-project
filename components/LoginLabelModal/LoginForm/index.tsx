"use client";

import { useForm } from "react-hook-form";
import { useImperativeHandle, useState } from "react";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
import { useMemberLogin } from "@/swr/auth/useLoginAndRefreshToken";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/schema/AuthForm";

// zod schema 轉換為typescript
type FormType = z.infer<typeof loginSchema>;
type Props = {
  ref: React.Ref<FormHandle>;
  close: () => void;
};
interface CustomError extends Error {
  status?: number;
}
export type FormHandle = {
  resetForm: () => void;
};

export default function LoginForm({ ref, close }: Props) {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
    shouldUnregister: true,
  });

  const { trigger, isMutating } = useMemberLogin();

  const onSubmit = async (data: FormType) => {
    try {
      await trigger({
        provider: "local",
        email: data.email,
        password: data.password,
      });
      toast.success("登入成功");
      close();
      router.refresh();
    } catch (err) {
      const customErr = err as CustomError;
      if (customErr.status === 401) {
        setLoginError("Email或密碼輸入錯誤");
      }
      toast.error("登入失敗");
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      resetForm: () => {
        reset();
        clearErrors();
      },
    }),
    [reset, clearErrors]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormHookInput
        label="Email"
        type="email"
        placeholder="請填入Email"
        register={register("email")}
        onFocus={() => {
          setLoginError("");
        }}
        error={errors.email}
      />

      <FormHookInput
        label="密碼"
        type="password"
        placeholder="請填入密碼"
        register={register("password")}
        onFocus={() => {
          setLoginError("");
        }}
        error={errors.password}
      />
      {loginError && <p className="text-base text-error">{loginError}</p>}
      <p className="text-base text-end mb-1.5 text-gray-500 underline decoration-1 cursor-pointer">
        忘記密碼?
      </p>
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isMutating || Object.keys(errors).length > 0}
      >
        {isMutating ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "登入"
        )}
      </button>
    </form>
  );
}
