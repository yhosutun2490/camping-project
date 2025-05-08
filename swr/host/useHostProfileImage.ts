"use client";

import { useCallback } from "react";
import useSWRMutation from 'swr/mutation';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from "@/api/axiosIntance";
import { UploadImageResponse } from "@/types/api/host";

// 上傳主辦方頭像
async function uploadHostAvatar(_key: string, { arg }: { arg: File }) {
  const formData = new FormData();
  formData.append("file", arg);
  
  try {
    const response = await axiosInstance.post<UploadImageResponse>("/host/profile/avatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error: unknown) {
    // 處理錯誤
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "上傳頭像失敗");
    }
    throw new Error("上傳頭像時發生錯誤");
  }
}

// 上傳主辦方封面照
async function uploadHostCover(_key: string, { arg }: { arg: File }) {
  const formData = new FormData();
  formData.append("file", arg);
  
  try {
    const response = await axiosInstance.post<UploadImageResponse>("/host/profile/cover", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error: unknown) {
    // 處理錯誤
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "上傳封面照失敗");
    }
    throw new Error("上傳封面照時發生錯誤");
  }
}

// 主辦方頭像上傳 Hook
export function useHostAvatarUpload() {
  const { trigger, isMutating, error, data } = useSWRMutation('/host/profile/avatar', uploadHostAvatar);
  
  const uploadAvatar = useCallback(async (file: File) => {
    // 確保檔案不是空的且確實是檔案
    if (!file || !(file instanceof File) || file.size === 0) {
      const errorMessage = "請選擇有效的頭像圖片檔案";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // 檢查檔案類型是否為圖片
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      const errorMessage = `不支援的檔案類型: ${file.type}，請選擇 JPG, PNG, WebP 或 GIF 格式的圖片`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    try {
      const result = await trigger(file);
      toast.success(result.message || "頭像上傳成功！");
      return result.data.photo_url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "上傳頭像時發生錯誤";
      toast.error(errorMessage);
      throw err;
    }
  }, [trigger]);
  
  return {
    uploadAvatar,
    isLoading: isMutating,
    error,
    data
  };
}

// 主辦方封面照上傳 Hook
export function useHostCoverUpload() {
  const { trigger, isMutating, error, data } = useSWRMutation('/host/profile/cover', uploadHostCover);
  
  const uploadCover = useCallback(async (file: File) => {
    // 確保檔案不是空的且確實是檔案
    if (!file || !(file instanceof File) || file.size === 0) {
      const errorMessage = "請選擇有效的背景圖片檔案";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // 檢查檔案類型是否為圖片
    const validImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      const errorMessage = `不支援的檔案類型: ${file.type}，請選擇 JPG, PNG, WebP 或 GIF 格式的圖片`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    try {
      const result = await trigger(file);
      toast.success(result.message || "封面照上傳成功！");
      return result.data.photo_url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "上傳封面照時發生錯誤";
      toast.error(errorMessage);
      throw err;
    }
  }, [trigger]);
  
  return {
    uploadCover,
    isLoading: isMutating,
    error,
    data
  };
}
