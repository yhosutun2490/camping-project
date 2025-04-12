"use client"

import { useForm } from "react-hook-form";
import { useImperativeHandle } from "react";
import React from "react";
import FormHookInput from  "@/components/FormHookInput"

type FormType = {
  account: string;
  firstName: string;
  lastName: string;
  password: string ;
};
type Props = {
  ref: React.Ref<FormHandle>; 
};

export type FormHandle = {
  resetForm: () => void;
};

export default function CreateUserForm({ref}:Props) {
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
        label="姓氏"
        type="text"
        placeholder="請填入您姓氏"
        register={register("firstName", { required: "姓氏為必填" })}
        error={errors.firstName}
      />
       <FormHookInput
        label="姓名"
        type="text"
        placeholder="請填入您的姓名"
        register={register("lastName", { required: "姓名為必填" })}
        error={errors.lastName}
      />
      <FormHookInput
        label="密碼"
        type="password"
        placeholder="請填入密碼"
        register={register("password", { required: "密碼為必填" })}
        error={errors.password}
      />
      <button type="submit" className="btn btn-primary">創建會員</button>
    </form>
  );
}