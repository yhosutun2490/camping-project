"use client";

import { useCallback } from "react";
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import axios from 'axios';

import axiosInstance from "@/api/axiosIntance";
import { CreateHostProfileRequest, HostProfileResponse } from "@/types/api/host";

// 建立主辦單位資料 API
async function createHostProfile(url: string, { arg }: { arg: CreateHostProfileRequest }) {
  try {
    const response = await axiosInstance.post<HostProfileResponse>("/host/profile", arg, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error: unknown) {
    // 處理錯誤
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "註冊主辦單位失敗");
    }
    throw new Error("註冊主辦單位時發生錯誤");
  }
}

// 主辦單位註冊 Hook
export function useCreateHostProfile() {
  const { trigger, isMutating, error, data } = useSWRMutation('/host/profile', createHostProfile);
  
  // 包裝 trigger 函式處理更佳的錯誤處理
  const createHost = useCallback(async (profileData: CreateHostProfileRequest) => {
    try {
      const result = await trigger(profileData);
      
      // 成功提示
      toast.success(result.message || "主辦單位註冊成功！");
      return result;
    } catch (err) {
      // 錯誤提示
      const errorMessage = err instanceof Error ? err.message : "註冊主辦單位時發生錯誤";
      toast.error(errorMessage);
      throw err;
    }
  }, [trigger]);
  
  return {
    createHost,
    isLoading: isMutating,
    error,
    data
  };
}