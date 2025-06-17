"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export function useGoogleAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const url = new URL(window.location.href);
      const accessToken = url.searchParams.get("access_token");
      const refreshToken = url.searchParams.get("refresh_token");
  
      if (accessToken && refreshToken) {
        try {
          await axios.post(
            "/api/auth/set-cookies",
            { accessToken, refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true, 
            }
          );
          const cleanUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
          toast.success('登入成功')
          router.refresh();
        } catch (error) {
          console.error("登入失敗：無法寫入 cookie", error);
          toast.success('登入失敗，請稍後再試')
          router.refresh();
        }
      }
    };

    handleAuthRedirect();
  }, [router]);
}
