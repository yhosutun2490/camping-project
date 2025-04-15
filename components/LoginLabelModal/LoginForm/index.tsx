"use client"

import { useForm } from "react-hook-form";
import { useImperativeHandle } from "react";
import React from "react";
import FormHookInput from  "@/components/FormHookInput"
import { useMemberLogin } from "@/swr/auth/useAuth";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation"


type FormType = {
  account: string;
  password: string ;
  email: string
};
type Props = {
  ref: React.Ref<FormHandle>; 
  close: ()=>void
};
interface CustomError extends Error {
  status?: number;
}
export type FormHandle = {
  resetForm: () => void;
};

export default function LoginForm({ref,close}:Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormType>();

  const {trigger, isMutating} = useMemberLogin()

  const onSubmit = async (data: FormType) => {
    try {
      await trigger( {
        provider: 'local',
        username: data.account,
        password: data.password,
        email: data.email
      })
      toast.success('登入成功')
      close()
      router.push('/')
    } catch(err) {
      const customErr = err as CustomError;
      if (customErr.status === 401) {
        setError("account", {
          type: "manual",
          message: "",
        });
        setError("email", {
          type: "manual",
          message: "",
        });
        setError("password", {
          type: "manual",
          message: "帳號、email或密碼錯誤",
        });
      }
      toast.error('登入失敗')
    }
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
        label="Email"
        type="email"
        placeholder="請填入Email"
        register={register("email", { 
            required: "email為必填", 
        })}
        error={errors.email}
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
      <button type="submit" className="btn btn-primary w-full">
      { isMutating ? <span className="loading loading-spinner"></span> : '登入' }
      </button>
    </form>
  );
}