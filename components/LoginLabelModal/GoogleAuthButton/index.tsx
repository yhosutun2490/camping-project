"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";
interface Props {
  isLogin: boolean,
  className?: string
}
export default function GoogleAuthButton({isLogin = false,className}:Props) {

  return (
    <a href="https://everforest-backend.zeabur.app/api/v1/auth/oauth/google"
    >
      <button
        type="button"
        className={clsx(`flex items-center justify-center gap-2 cursor-pointer
        py-2 px-4 border border-gray-300 rounded-2xl bg-white text-gray-700 hover:shadow transition`,className)}
      >
        <Icon icon="flat-color-icons:google" width={30} height={30} />
          使用Google帳號{isLogin?"登入":"註冊"}
      </button>
    </a>
  );
}
