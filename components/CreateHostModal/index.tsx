"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import DialogModal from "@/components/DialogModal";
import CreateHostForm from "@/components/CreateHostModal/CreateHostForm";

// 表單操作的參考型別
export type FormHandle = {
  resetForm: () => void;
};

interface CreateHostModalProps {
  onSuccess?: () => void;
}

export default function CreateHostModal({ onSuccess }: CreateHostModalProps) {
  const modalRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<FormHandle>(null);
  const router = useRouter();

  // 關閉彈窗
  function closeModal(): void {
    if (modalRef.current) {
      modalRef.current.checked = false; // 關閉 modal
      // 延遲重置表單，確保 modal 關閉動畫完成
      setTimeout(() => {
        formRef?.current?.resetForm();
      }, 200);
    }
  }

  // 處理註冊成功
  function handleSuccess() {
    // 先關閉彈窗
    closeModal();
    
    // 呼叫外部成功回調
    if (onSuccess) {
      onSuccess();
    } else {
      // 默認行為：重新載入資料並導向建立活動頁面
      router.refresh(); // 重新載入伺服器組件資料
      setTimeout(() => {
        router.push('/create-activity');
      }, 100);
    }
  }

  return (
    <>
      <label htmlFor="create-host" className="flex items-center hover:text-primary-500 cursor-pointer">
        辦活動
      </label>
      <DialogModal 
        modalWidth="max-w-5xl" 
        id="create-host" 
        modalRef={modalRef}
      >
        <p className="text-3xl text-base-200 text-center">
          成為主辦方
        </p>
        <p className="text-center text-gray-600 mt-1 mb-4">
          請填寫以下資訊，完成後即可開始建立活動
        </p>
        <CreateHostForm ref={formRef} close={closeModal} onSuccess={handleSuccess} />
      </DialogModal>
    </>
  );
}
