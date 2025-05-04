"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  UseFormSetValue,
  UseFormSetError,
  FieldError,
  UseFormClearErrors,
} from "react-hook-form";
import { memberInfoSchema } from "@/schema/MemberInfoForm";
import { z } from "zod";
import toast from "react-hot-toast";
import { useUpdateMemberAvatar } from "@/swr/member/profile/useMemberProfile";
import { useRouter } from "next/navigation"

type FormType = z.infer<typeof memberInfoSchema>;
type Props = {
  initialLink?: string;
  error?: FieldError;
  setValue: UseFormSetValue<FormType>;
  setError: UseFormSetError<FormType>; // react form 設定錯誤 setError
  clearErrors: UseFormClearErrors<FormType>; // react form 清除錯誤
  onUpload?: (url: string) => void; //上傳api回傳成功的圖片url
};

export default function UserAvatarUpload({
  initialLink,
  setValue,
  setError,
  clearErrors,
  error,
}: Props) {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(initialLink);
  // inputRef
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { trigger, isMutating } = useUpdateMemberAvatar(); // 上傳圖片api custom hook

  function handleClickUpload() {
    inputRef?.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 清除舊有錯誤
    clearErrors("photo_url");

    if (file && file.size > 2 * 1024 * 1024 && setError) {
      setError("photo_url", {
        type: "manual",
        message: "檔案不能大於 2MB",
      });
      return;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setError?.("photo_url", {
        type: "manual",
        message: "只支援 JPG、PNG、WEBP 格式",
      });
      return;
    }

    // 本機預覽
    const previewURL = URL.createObjectURL(file);

    // upload avatar api
    try {
      const res = await trigger(file);
      toast.success("個人大頭照上傳成功");
      router.refresh()
      setValue("photo_url", res.data.avatar_url);
      setAvatarUrl(previewURL);
    } catch (err) {
      if (err instanceof Error) {
        const message = err?.message;
        toast.error(`個人大頭照上傳失敗-${message}`);
      }
    }
  }

  return (
    <div className="avatar_upload">
      <fieldset className="fieldset flex">
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="file-input hidden"
          ref={inputRef}
          onChange={handleFileChange}
        />
        <label
          className={`label text-base self-end order-last ${
            error ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleClickUpload}
        >
          {isMutating ? "上傳中…" : error ? error.message : "點擊上傳個人圖片"}
        </label>
        <div className="avatar relative w-24 h-24 rounded-full overflow-hidden">
          {isMutating && (
            <div className="absolute w-full h-full inset-0 bg-white/50 
              flex items-center justify-center rounded-full"
            >
              <div className="absolute inset-[50%] translate-[-50%] loading loading-spinner loading-lg text-primary-500"></div>
            </div>
          )}
          <div
            className={`${
              isMutating ? "opacity-50  pointer-events-none" : ""
            }`}
            onClick={handleClickUpload}
          >
            <Image
              src={avatarUrl || "/header/user_image.jpg"}
              width={35}
              height={35}
              alt="Picture of the author"
              className="cursor-pointer"
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
