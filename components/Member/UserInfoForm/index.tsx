"use client";
import UserAvatarUpload from "@/components/Member/UserInfoForm/UserAvatarUpload";
import { useForm } from "react-hook-form";
import React from "react";
// import FormHookInput from "@/components/FormHookInput";
// import toast from 'react-hot-toast';
import { memberInfoSchema } from "@/schema/MemberInfoForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export default function MemberInfoForm() {
  // zod schema 轉換為typescript
  type FormType = z.infer<typeof memberInfoSchema>;
  const {
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(memberInfoSchema),
    shouldUnregister: true,
  });

  return (
    <div className="member_info_form">
      <UserAvatarUpload setValue={setValue}
      clearErrors={clearErrors} 
      setError={setError} 
      error={errors.photo_url}
      />
    </div>
  );
}
