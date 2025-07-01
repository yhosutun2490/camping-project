"use client";
import { useState } from "react";
import DialogModal from "@/components/DialogModal";
import { useRequestUnpublishEvent } from "@/swr/host/useRequestUnpublishEvent";
import toast from "react-hot-toast";
import clsx from "clsx";

interface Props {
  modalId: string;
  modalRef: React.RefObject<HTMLInputElement | null>;
  eventId: string;
  eventTitle: string;
}

export default function RejectEventModal({
  modalId,
  modalRef,
  eventId,
  eventTitle
}: Props) {
  const [rejectReason, setRejectReason] = useState<string>("");
  const { requestUnpublish, isMutating } = useRequestUnpublishEvent();

  /** 處理退件確認 */
  async function handleRejectConfirm() {
    if (!rejectReason.trim()) {
      toast.error("請輸入退件原因");
      return;
    }

    try {
      await requestUnpublish(eventId, rejectReason.trim());
      // 成功後關閉 modal 並清空表單
      handleCloseModal();
    } catch (error) {
      console.error("退件失敗:", error);
      // 錯誤訊息已在 hook 中處理，這裡不需要再次顯示
    }
  }

  /** 處理取消並關閉 modal */
  function handleCloseModal() {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
    // 清空退件原因
    setRejectReason("");
  }

  return (
    <DialogModal id={modalId} modalRef={modalRef} modalWidth="max-w-md">
      <div className="space-y-4">
        {/* 標題 */}
        <div className="heading-5 text-[#AB5F5F] font-semibold">
          申請活動下架
        </div>
        
        {/* 活動資訊 */}
        <div className="text-sm text-[#6D6D6D]">
          活動名稱：<span className="text-[#121212]">{eventTitle}</span>
        </div>

        {/* 退件原因輸入框 */}
        <div className="space-y-2">
          <label htmlFor="reject-reason" className="text-sm text-[#121212] font-medium">
            <span className="text-[#AB5F5F]">*</span> 下架原因
          </label>
          <textarea
            id="reject-reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="請輸入申請下架的原因..."
            className="w-full px-3 py-2 border border-[#E7E7E7] rounded-lg text-sm text-[#121212] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#5C795F] focus:border-transparent resize-none"
            rows={4}
            maxLength={500}
          />
          <div className="text-xs text-[#6D6D6D] text-right">
            {rejectReason.length}/500
          </div>
        </div>
      </div>

      {/* 按鈕區域 */}
      <div className="modal-action flex gap-3 mt-6">
        <button
          onClick={handleCloseModal}
          disabled={isMutating}
          className="flex-1 px-4 py-2 border border-[#E7E7E7] text-[#6D6D6D] rounded-lg text-sm font-medium hover:bg-[#F6F6F6] transition-colors disabled:opacity-50"
        >
          取消
        </button>
        <button
          onClick={handleRejectConfirm}
          disabled={isMutating || !rejectReason.trim()}
          className={clsx(
            "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            "bg-[#5C795F] text-white hover:bg-[#4A6B4D]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isMutating ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "確認申請"
          )}
        </button>
      </div>
    </DialogModal>
  );
}
