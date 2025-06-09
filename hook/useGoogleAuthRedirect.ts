"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useGoogleAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const url = new URL(window.location.href);
      const accessToken = url.searchParams.get("accessToken");
      const refreshToken = url.searchParams.get("refreshToken");

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

          router.refresh();
        } catch (error) {
          console.error("登入失敗：無法寫入 cookie", error);
          router.refresh();
        }
      }
    };

    handleAuthRedirect();
  }, [router]);
}
