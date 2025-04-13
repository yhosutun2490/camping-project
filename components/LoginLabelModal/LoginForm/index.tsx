"use client"

import { useForm } from "react-hook-form";
import { useImperativeHandle } from "react";
import React from "react";
import FormHookInput from  "@/components/FormHookInput"

type FormType = {
  account: string;
  password: string ;
};
type Props = {
  ref: React.Ref<FormHandle>; 
};

export type FormHandle = {
  resetForm: () => void;
};

export default function LoginForm({ref}:Props) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    console.log("表單資料：", data);
  };

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset();
      clearErrors();
    },
  }), [reset,clearErrors]);
 
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <FormHookInput
        label="帳號"
        type="text"
        placeholder="請填入您的帳號"
        register={register("account", { required: "標題為必填" })}
        error={errors.account}
      />
    
      <FormHookInput
        label="密碼"
        type="password"
        placeholder="請填入密碼"
        register={register("password", { 
            required: "密碼為必填",
            pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "密碼需至少8位，且包含英文字母與數字"
            }  
        })}
        error={errors.password}
      />
      <p className="text-base text-end mb-1.5 text-gray-500">忘記密碼?</p>
      <button type="submit" className="btn btn-primary w-full">登入</button>
    </form>
  );
}