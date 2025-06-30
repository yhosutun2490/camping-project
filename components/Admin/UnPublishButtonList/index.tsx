"use client";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import clsx from "clsx";
import { useRef, useState, useId } from "react";
import { AxiosError } from "axios";
import {
 useAdminUnpublishEvent
} from "@/swr/admin/event/useAdminEvent";
import DialogModal from "@/components/DialogModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  eventId: string;
  className?: string;
}
export default function UnPublishButtonList({ className, eventId }: Props) {
  const router = useRouter();
  const randomId = useId();
  const approveModalId = `${eventId}-unpublish-ok-${randomId}`
  const approveModalRef = useRef<HTMLInputElement>(null);

  const rejectModalId = `${eventId}-unpublish-reject-${randomId}`;
  const rejectModalRef = useRef<HTMLInputElement>(null);
  /** 同意原因 */
  const [approveReason, setApproveReason] = useState("");
  /** 退回原因 */
  const [rejectReason, setRejectReason] = useState("");
 

  // unPublish swr
  const { trigger: patchUnPublishEvent, isMutating: isLoadingUnPublish } =
    useAdminUnpublishEvent();


  async function handleApproveUnPublishEvent() {
    try {
      await patchUnPublishEvent({ eventId, comment:approveReason, isApprove:true });
      router.refresh();
    toast.success("活動下架成功");
    } catch (err) {
      let message = "發生未知錯誤";
      if (err instanceof AxiosError && err.response) {
        message = err.response.data?.message || message;
        toast.error(`活動下架失敗-${message}`);
        return;
      }
      toast.error(`活動下架失敗-${message}`);
    }
  }

  async function handleRejectUnPublishEvent() {
    try {
      await patchUnPublishEvent({ eventId, comment:rejectReason, isApprove:false });
      router.refresh();
      toast.success("活動下架審核退回成功");
    } catch (err) {
      let message = "發生未知錯誤";
      if (err instanceof AxiosError && err.response) {
        message = err.response.data?.message || message;
        toast.error(`活動下架審核失敗-${message}`);
        return;
      }
      toast.error(`活動下架審核失敗-${message}`);
    }
  }

  return (
    <div className={clsx("flex flex-col gap-4 px-4 pb-2 lg:p-0", className)}>
       <label htmlFor={approveModalId} className="flex-grow">
        {isLoadingUnPublish ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <div className="btn-primary flex-grow-1 text-xs h-8 
        flex justify-center items-center gap-1">
            <IconWrapper icon="mdi:check" className="text-white"></IconWrapper>
            <span>同意</span>
          </div>
        )}
      </label>
      <DialogModal id={approveModalId} modalRef={approveModalRef}>
        <div className="reject_content flex flex-col space-y-4">
          <p className="heading-5 text-primary-500">活動下架審核通過原因</p>
          <textarea
            id="reject-event"
            value={approveReason}
            onChange={(e) => setApproveReason(e.target.value)}
            className="w-full h-24 rounded-md border border-neutral-300
                       px-3 py-2 text-sm focus:outline-none focus:ring-2
                       focus:ring-primary-300 resize-none placeholder:text-neutral-400"
            placeholder="請輸入通過原因…"
          />
          <button className="btn-primary ml-auto" onClick={handleApproveUnPublishEvent}>
            {isLoadingUnPublish ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>同意申請</span>
            )}
          </button>
        </div>
      </DialogModal>
      <label htmlFor={rejectModalId} className="flex-grow">
        {isLoadingUnPublish ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <div className="flex justify-center items-center text-xs h-8 w-full font-bold px-4 py-2 bg-orange-500
                 rounded-2xl text-white hover:bg-orange-700 cursor-pointer">
            <IconWrapper icon="mdi:close" className="text-white"></IconWrapper>
            <span>不同意</span>
          </div>
        )}
      </label>
      <DialogModal id={rejectModalId} modalRef={rejectModalRef}>
        <div className="reject_content flex flex-col space-y-4">
          <p className="heading-5 text-neutral-950">活動下架審核未通過原因</p>
          <textarea
            id="reject-event"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="w-full h-24 rounded-md border border-neutral-300
                       px-3 py-2 text-sm focus:outline-none focus:ring-2
                       focus:ring-primary-300 resize-none placeholder:text-neutral-400"
            placeholder="請輸入退回原因…"
          />
          <button className="btn-error ml-auto" onClick={handleRejectUnPublishEvent}>
            {isLoadingUnPublish ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>退回申請</span>
            )}
          </button>
        </div>
      </DialogModal>
    </div>
  );
}
