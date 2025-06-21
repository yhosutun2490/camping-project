"use client";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import clsx from "clsx";
import { useRef, useState, useId } from "react";
import { AxiosError } from "axios";
import {
  useAdminApproveEvent,
  useAdminRejectEvent,
} from "@/swr/admin/event/useAdminEvent";
import DialogModal from "@/components/DialogModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  eventId: string;
  className?: string;
}
export default function ApproveButtonList({ className, eventId }: Props) {
  const router = useRouter();
  const randomId = useId();
  const modalId = `${eventId}-reject-${randomId}`;
  const rejectModalRef = useRef<HTMLInputElement>(null);
  /** 退回原因 */
  const [reason, setReason] = useState("");

  // approve swr
  const { trigger: patchApproveEvent, isMutating: isLoadingApprove } =
    useAdminApproveEvent();
  // reject swr
  const { trigger: patchRejectEvent, isMutating: isLoadingReject } =
    useAdminRejectEvent();

  async function handleApproveEvent() {
    try {
      await patchApproveEvent({ eventId });
      toast.success("活動上架成功");
      router.refresh();
    } catch (err) {
      let message = "發生未知錯誤";
      if (err instanceof AxiosError && err.response) {
        message = err.response.data?.message || message;
        toast.error(`活動審核失敗-${message}`);
        return;
      }
      toast.error(`活動審核失敗-${message}`);
    }
  }

  async function handleRejectEvent() {
    try {
      await patchRejectEvent({ eventId, reason });
      toast.success("活動退件成功");
      router.refresh();
    } catch (err) {
      let message = "發生未知錯誤";
      if (err instanceof AxiosError && err.response) {
        message = err.response.data?.message || message;
        toast.error(`活動退件失敗-${message}`);
        return;
      }
      toast.error(`活動退件失敗-${message}`);
    }
  }

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <button
        className="btn-primary flex-grow-1 text-xs h-8 
        flex justify-center items-center gap-1"
        onClick={handleApproveEvent}
      >
        {isLoadingApprove ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <div className="flex items-center">
            <IconWrapper icon="mdi:check" className="text-white"></IconWrapper>
            <span>通過</span>
          </div>
        )}
      </button>
      <label htmlFor={modalId} className="flex-grow">
        <div
          className="flex justify-center items-center text-xs h-8 w-full font-bold px-4 py-2 bg-orange-500
                 rounded-2xl text-white hover:bg-orange-700 cursor-pointer"
        >
          <IconWrapper icon="mdi:close" className="text-white" />
          退回
        </div>
      </label>
      <DialogModal id={modalId} modalRef={rejectModalRef}>
        <div className="reject_content flex flex-col space-y-4">
          <p className="heading-5 text-primary-500">活動審核未通過原因</p>
          <textarea
            id="reject-event"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-24 rounded-md border border-neutral-300
                       px-3 py-2 text-sm focus:outline-none focus:ring-2
                       focus:ring-primary-300 resize-none placeholder:text-neutral-400"
            placeholder="請輸入退回原因…"
          />
          <button className="btn-error ml-auto" onClick={handleRejectEvent}>
            {isLoadingReject ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>退回</span>
            )}
          </button>
        </div>
      </DialogModal>
    </div>
  );
}
