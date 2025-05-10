import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { UploadImageResponse } from '@/types/api/host';
import toast from 'react-hot-toast';

// 上傳主辦方頭像的 Hook
export function useHostAvatarUpload() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    '/api/host/profile/avatar',
    async (_key: string, { arg }: { arg: File }) => {
      const formData = new FormData();
      formData.append('file', arg); // 修改欄位名稱為 'file'，與後端 controller 一致

      try {
        toast.loading('上傳主辦方頭像中...', { id: 'avatar-upload' });
        const response = await axios.post<UploadImageResponse>(
          '/api/host/profile/avatar',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('主辦方頭像上傳成功', { id: 'avatar-upload' });
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message || '上傳頭像失敗');
        }
        throw new Error('上傳頭像時發生錯誤');
      }
    },
    { throwOnError: true }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}

// 主辦方封面照上傳 Hook
export function useHostCoverUpload() {
  const { isMutating, trigger, error, data } = useSWRMutation(
    '/api/host/profile/cover',
    async (_key: string, { arg }: { arg: File }) => {
      const formData = new FormData();
      formData.append('file', arg); // 修改欄位名稱為 'file'，與後端 controller 一致

      try {
        toast.loading('上傳背景圖片中...', { id: 'cover-upload' });
        const response = await axios.post<UploadImageResponse>(
          '/api/host/profile/cover',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        toast.success('背景圖片上傳成功', { id: 'cover-upload' });
        return response.data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message || '上傳封面照失敗');
        }
        throw new Error('上傳封面照時發生錯誤');
      }
    }
  );

  return {
    isMutating,
    trigger,
    data,
    error,
  };
}
