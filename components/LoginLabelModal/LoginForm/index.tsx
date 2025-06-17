"use client";

import { useForm } from "react-hook-form";
import { useImperativeHandle, useState } from "react";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
import ForgetPassWordForm from "@/components/LoginLabelModal/ForgetPasswordForm";
import { useMemberLogin } from "@/swr/auth/useLoginAndRefreshToken";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/schema/AuthForm";
import GoogleAuthButton from "../GoogleAuthButton";

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

type Step = "login" | "forgetPassword";

export default function LoginForm({ ref, close }: Props) {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>("");
  const [step, setStep] = useState<Step>("login"); // 忘記密碼表單切換步驟

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
        setStep("login");
      },
    }),
    [reset, clearErrors]
  );

  return step === "login" ? (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="text-3xl text-primary-500 text-center">登入</p>
      <FormHookInput
        label="Email"
        type="email"
        placeholder="請填入Email"
        register={register("email")}
        error={errors.email}
      />

      <FormHookInput
        label="密碼"
        type="password"
        placeholder="請填入密碼"
        register={register("password")}
        error={errors.password}
      />
      <p
        className="text-end text-primary-300 mb-2 font-semibold underline hover:text-gray-300"
        onClick={() => setStep("forgetPassword")}
      >
        忘記密碼
      </p>
      {loginError && <p className="text-base text-error">{loginError}</p>}

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={isMutating}
      >
        {isMutating ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "登入"
        )}
      </button>
      <GoogleAuthButton isLogin className="mt-4 mx-auto"/>
    </form>
  ) : (
    <ForgetPassWordForm setStep={setStep}/>
  );
}
