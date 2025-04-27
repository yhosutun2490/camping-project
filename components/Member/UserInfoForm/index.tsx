"use client";
import UserAvatarUpload from "@/components/Member/UserInfoForm/UserAvatarUpload";
import FormHookDropDown from "@/components/FormHookDropDown";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
// import toast from 'react-hot-toast';
import { memberInfoSchema } from "@/schema/MemberInfoForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MemberInfo } from "@/types/api/member/profile"

type Props = {
  initialProfile: MemberInfo | undefined
}

export default function MemberInfoForm( {initialProfile}: Props) {
  // zod schema 轉換為typescript
  type FormType = z.infer<typeof memberInfoSchema>;
  const {
    register,
    setError,
    setValue,
    clearErrors,
    control,
    formState: { errors, isValidating },
  } = useForm<FormType>({
    resolver: zodResolver(memberInfoSchema),
    shouldUnregister: true,
    defaultValues: {
      firstname: initialProfile?.firstname,
      lastname: initialProfile?.lastname,
      email: initialProfile?.email,
      phone: initialProfile?.phone
      // … 其他預設值
    },
  });

  const genderOptions = [
    {
      id: "1",
      label: "男",
      value: "male",
    },
    {
      id: "2",
      label: "女",
      value: "female",
    },
  ];
  return (
    <div className="member_info_form border-1 border-gray-300 rounded-2xl py-3 px-6">
      <form action="" className="grid grid-cols-2 gap-3">
        <div className="avatar_wrapper col-span-2">
          <UserAvatarUpload
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
            error={errors.photo_url}
          />
        </div>

        <FormHookInput
          label="姓氏"
          type="text"
          placeholder="請填入您的姓氏"
          register={register("firstname")}
          error={errors.firstname}
        />
        <FormHookInput
          label="姓名"
          type="text"
          placeholder="請填入您的姓名"
          register={register("lastname")}
          error={errors.lastname}
        />
        <FormHookInput
          label="電子信箱(預設登入帳號)"
          type="email"
          placeholder="請填入您的email"
          register={register("email")}
          error={errors.email}
          className="col-span-2"
          disabled={true}
        />
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormHookDropDown
              {...field}
              label="性別"
              options={genderOptions}
              placeholder="請選擇"
            />
          )}
        />
         <FormHookInput
          label="生日"
          type="date"
          placeholder="請選擇"
          register={register("birth")}
          error={errors.birth}
        />
        <FormHookInput
          label="Phone"
          type="phone"
          placeholder="請填入您的連絡電話"
          register={register("phone")}
          error={errors.phone}
          disabled={true}
        />
        <button
          type="submit"
          className="btn-primary w-[150px] h-[40px] col-span-2 justify-self-end"
          disabled={isValidating}
        >
          更新個人資料 
        </button>
      </form>
    </div>
  );
}
