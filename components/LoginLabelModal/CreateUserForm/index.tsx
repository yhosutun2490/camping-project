"use client";
import { useForm } from "react-hook-form";
import { useImperativeHandle } from "react";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
import { useCreateMember } from "@/swr/auth/useAuth";
import toast from 'react-hot-toast';

type FormType = {
  account: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};
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
    formState: { errors },
  } = useForm<FormType>();
  const { isMutating, trigger } = useCreateMember();

  const onSubmit = async (data: FormType) => {
    if (isMutating) return
    try {
      await trigger({
        provider: "local",
        username: data.account,
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      close()
      reset()
      toast.success("創建會員成功")
    } catch (err) {
      if ((err as Error).message === "Email已被使用") {
        toast.error("Email 已被使用")
        setError("email", {
          type: "manual",
          message: "Email 已被使用",
        });
      }
      if ((err as Error).message === "username已被使用") {
        toast.error("username已被使用")
        setError("account", {
          type: "manual",
          message: "username已被使用",
        });
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
        register={register("account", { required: "標題為必填" })}
        error={errors.account}
      />
      <div className="name-row flex gap-3.5 justify-between">
        <FormHookInput
          label="姓氏*"
          type="text"
          placeholder="請填入您的姓氏"
          register={register("firstName", { required: "姓氏為必填" })}
          error={errors.firstName}
          className="flex-grow-1"
        />
        <FormHookInput
          label="姓名*"
          type="text"
          placeholder="請填入您的姓名"
          register={register("lastName", { required: "姓名為必填" })}
          error={errors.lastName}
          className="flex-grow-1"
        />
      </div>

      <FormHookInput
        label="Email*"
        type="email"
        placeholder="請填入您的email"
        register={register("email", { required: "email為必填" })}
        error={errors.email}
      />
      <FormHookInput
        label="Phone*"
        type="phone"
        placeholder="請填入您的連絡電話"
        register={register("phone", { required: "phone為必填" })}
        error={errors.email}
      />
      <FormHookInput
        label="密碼*"
        type="password"
        placeholder="請填入密碼"
        register={register("password", {
          required: "密碼為必填",
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: "密碼需至少8位，且包含英文字母與數字",
          },
        })}
        error={errors.password}
      />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isMutating}
        >
          { isMutating ? <span className="loading loading-spinner"></span> : '創建會員' }
        </button>
    </form>
  );
}
