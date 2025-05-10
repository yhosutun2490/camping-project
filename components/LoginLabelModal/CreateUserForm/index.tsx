"use client";
import { useForm } from "react-hook-form";
import { useImperativeHandle } from "react";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
import { useCreateMember } from "@/swr/auth/useAuth";
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import axios from "axios";
import { registerSchema } from "@/schema/AuthForm";

type FormType = z.infer<typeof registerSchema>
type Props = {
  ref: React.Ref<FormHandle>;
  close: ()=>void
};

export type FormHandle = {
  resetForm: () => void;
};

export default function CreateUserForm({ ref,close }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValidating },
  } = useForm<FormType>({
    resolver: zodResolver(registerSchema),
    shouldUnregister: true, 
  });
  const { isMutating, trigger } = useCreateMember();

  const onSubmit = async (data: FormType) => {
    if (isMutating) return
    try {
      await trigger({
        provider: "local",
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      close()
      reset()
      toast.success("註冊完成，請重新登入")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        console.log("message", message);
        if (message === "Email 已被使用") {
          toast.error("Email 已經註冊過")
          setError("email", {
            type: "manual",
            message: "Email已經註冊過",
          });
        }
        else if (message === "Username 已被使用") {
          toast.error("帳號名稱已被註冊過")
          setError("username", {
            type: "manual",
            message: "帳號名稱已經註冊過",
          });
        }
        else if (message === "手機號碼已被使用") {
            toast.error("手機號碼已被註冊過")
            setError("phone", {
              type: "manual",
              message: "手機號碼已經註冊過",
            });
        } else {
          toast.error("註冊失敗，請稍後再試")
        }   
      }
     
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormHookInput
        label="帳號*"
        type="text"
        placeholder="請填入您的帳號"
        register={register("username")}
        error={errors.username}
      />
      <div className="name-row flex gap-3.5 justify-between">
        <FormHookInput
          label="姓氏*"
          type="text"
          placeholder="請填入您的姓氏"
          register={register("firstname",)}
          error={errors.firstname}
          className="flex-grow-1"
        />
        <FormHookInput
          label="姓名*"
          type="text"
          placeholder="請填入您的姓名"
          register={register("lastname")}
          error={errors.lastname}
          className="flex-grow-1"
        />
      </div>

      <FormHookInput
        label="Email*"
        type="email"
        placeholder="請填入您的email"
        register={register("email")}
        error={errors.email}
      />
      <FormHookInput
        label="Phone*"
        type="phone"
        placeholder="請填入您的連絡電話"
        register={register("phone")}
        error={errors.phone}
      />
      <FormHookInput
        label="密碼*"
        type="password"
        placeholder="請填入密碼"
        register={register("password")}
        error={errors.password}
      />
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isMutating || isValidating || Object.keys(errors).length > 0}
        >
          { isMutating ? <span className="loading loading-spinner"></span> : '創建會員' }
        </button>
    </form>
  )
}
