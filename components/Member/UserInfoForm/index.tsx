"use client";
import UserAvatarUpload from "@/components/Member/UserInfoForm/UserAvatarUpload";
// import FormHookDropDown from "@/components/FormHookDropDown";
import FormRadioGroup from "@/components/FormRadioGroup";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import FormHookInput from "@/components/FormHookInput";
import toast from "react-hot-toast";
import { memberInfoSchema } from "@/schema/MemberInfoForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MemberInfo } from "@/types/api/member/profile";
import { useUpdateMemberProfile } from "@/swr/member/profile/useMemberProfile";
import { useRouter } from "next/navigation";
type Props = {
  initialProfile: MemberInfo | undefined;
};

export default function MemberInfoForm({ initialProfile }: Props) {
  // zod schema 轉換為typescript
  type FormType = z.infer<typeof memberInfoSchema>;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(memberInfoSchema),
    shouldUnregister: true,
    defaultValues: {
      photo_url: initialProfile?.photo_url,
      firstname: initialProfile?.firstname,
      lastname: initialProfile?.lastname,
      username: initialProfile?.username,
      email: initialProfile?.email,
      phone: initialProfile?.phone,
      birth: initialProfile?.birth,
      gender: initialProfile?.gender as "male" | "female" | undefined | null,
      // … 其他預設值
    },
  });
  register("photo_url"); // 註冊photo url 表單欄位給予avatar 紀錄資料
  // api swr custom hook
  const { trigger, isMutating } = useUpdateMemberProfile();

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

  async function onSubmit(data: FormType) {
    console.log("個人表單資料", data);
    if (isMutating) return;
    try {
      const res = await trigger({
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        gender: data.gender ?? "",
        photo_url: data.photo_url ?? "",
        phone: data.phone,
        email: data.email,
        birth: data.birth ?? "",
      });

      console.log("修改個人資料成功結果", res.data.message);
      toast.success("修改個人資料成功");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(`修改個人資料失敗`);
      }
    }
  }

  return (
    <div className="member_info_form">
      <p className="heading-2 text-neutral-900 mb-1">管理個人資料</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:grid md:grid-cols-2 md:gap-x-4 grid-rows-auto"
      >
        <div className="btn-wrap flex col-span-2 h-[61px] items-center justify-between 
          border-b border-primary-300">
          <p className="heading-5 text-primary-700">修改個人基本資訊</p>
          <button
            type="submit"
            className="text-primary-700 rounded-2xl border-2 border-primary-700 
          w-[100px] h-[40px] col-span-2 justify-self-end 
          cursor-pointer hover:bg-primary-500 hover:text-white"
            disabled={isMutating || Object.keys(errors).length > 0}
          >
            {isMutating ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "儲存"
            )}
          </button>
        </div>
        <div className="avatar_wrapper my-6 md:my-8 col-span-2 space-y-3">
          <p className="text-sm text-neutral-700">個人圖片</p>
          <UserAvatarUpload
            initialLink={initialProfile?.photo_url}
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
          isRequired
          register={register("firstname")}
          error={errors.firstname}
        />
        <FormHookInput
          label="姓名"
          type="text"
          placeholder="請填入您的姓名"
          isRequired
          register={register("lastname")}
          error={errors.lastname}
        />
        <FormHookInput
          label="電子信箱(預設登入帳號)"
          type="email"
          placeholder="請填入您的email"
          isRequired
          register={register("email")}
          error={errors.email}
          className="col-span-2"
          disabled={true}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            // <FormHookDropDown
            //   {...field}
            //   label="性別"
            //   options={genderOptions}
            //   placeholder="請選擇"
            //   value={field.value ?? undefined}
            // />
            <FormRadioGroup
              label="性別"
              name={field.name}
              value={field.value ?? undefined}
              onChange={field.onChange}
              options={genderOptions}
            />
          )}
        />
        <FormHookInput
          label="出生日期"
          type="date"
          placeholder="請選擇"
          register={register("birth")}
          error={errors.birth}
        />
        <FormHookInput
          label="電話號碼"
          type="phone"
          placeholder="請填入您的連絡電話"
          register={register("phone")}
          error={errors.phone}
          disabled={true}
        />
        <FormHookInput
          label="帳戶名(暱稱)"
          type="text"
          placeholder="請填入您的帳戶名稱"
          register={register("username")}
          error={errors.username}
        />
      </form>
    </div>
  );
}
