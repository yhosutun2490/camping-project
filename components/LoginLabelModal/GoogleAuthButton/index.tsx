"use client";
import { Icon } from "@iconify/react";
// import { useOAuthGoogle } from "@/swr/auth/useAuth";

export default function GoogleAuthButton() {
//   const { trigger, isMutating } = useOAuthGoogle();
//   function handleGoogleLogin() {
//     trigger();
//   }

  return (
    <a href="https://everforest-backend.zeabur.app/api/v1/auth/oauth/google">
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 hover:shadow transition"
      >
        <Icon icon="flat-color-icons:google" width={40} height={40} />
        使用Google帳號 登入
      </button>
    </a>
  );
}
