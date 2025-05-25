"use client";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import FormHookInput from "@/components/FormHookInput";
import { useForgetPasswordSendEmail } from "@/swr/auth/useAuth"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgetPasswordSendEmailSchema } from "@/schema/AuthForm";
import toast from "react-hot-toast";
import axios from "axios";


// zod schema 轉換為typescript
type FormType = z.infer<typeof forgetPasswordSendEmailSchema>;

interface Props {
  setStep: (value: 'login') => void
}

export default function ForgetPassWordForm({ setStep }: Props) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    mode: "onSubmit",
    resolver: zodResolver(forgetPasswordSendEmailSchema),
    shouldUnregister: true,
  });
  
  const [isSendEmailSuccess,setIsSendEmailSuccess] = useState<boolean>(false)

  const {trigger, isMutating} = useForgetPasswordSendEmail()

  const onSubmit = async (data: FormType) => {
    try {
      trigger({email: data?.email})
      toast.success('已寄送更新密碼連結')
      setIsSendEmailSuccess(true)
    } catch(err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 400) {
          toast.error("欄位錯誤或格式錯誤")
        }
        else if (status === 429) {
          toast.error("請求過於頻繁，請稍後再試")
        }
        else  {
          toast.error("伺服器錯誤，請稍後再試")
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="text-3xl text-primary-500 text-center">忘記密碼?</p>
      {!isSendEmailSuccess? <>
         <FormHookInput
        label="Email"
        type="email"
        placeholder="請填入Email"
        register={register("email")}
        error={errors.email}
      />

      <button
        type="submit"
        className="btn-primary w-full"
        disabled={Object.keys(errors).length > 0 || isMutating}
      >
        {isMutating ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "寄送新密碼設定連結"
        )}
      </button>
      </>: <p className="text-2xl text-neutral-950 mt-5 text-center">已經寄送重新設定連結，請稍後至信箱確認!</p>}
 
   
      <div
        className="text-base text-end mt-1.5 
        text-gray-500 underline decoration-1 cursor-pointer hover:text-gray-300"
        onClick={()=>setStep('login')}
      >
        登入
      </div>
    </form>
  );
}
