"use client";
import { useState, useRef } from "react"
import ImageSkeleton from "@/components/ImageSkeleton";
import clsx from "clsx";
import { usePostMemberOrdersQRcode } from "@/swr/member/orders/qrCode/useCreateQRcode";
import { useRefundMemberOrders } from "@/swr/member/orders/useMemberOrders"
import axios from "axios";
import toast from "react-hot-toast";
import DialogModal from "@/components/DialogModal";
import { useRouter } from "next/navigation"


export type TicketStatus = "incoming" | "finished" | "refunded";
export type EventTicket = {
  imageUrl: string;
  status: TicketStatus;
  title: string;
  planName: string;
  orderNumber: string;
  date: string;
  price: number;
};

export default function EventTicketCard({
  imageUrl,
  status,
  title,
  planName,
  orderNumber,
  date,
  price,
}: EventTicket) {
  const ticketStatusMap: Record<"incoming" | "finished" | "refunded", string> = {
    incoming: "即將到來",
    finished: "已完成",
    refunded: "已取消／退款中",
  };
  const ticketStatusColor: Record<"incoming" | "finished" | "refunded", string> =
  {
    incoming: "text-blue-600",
    finished: "text-green-600",
    refunded: "text-red-600",
  };
  const router = useRouter()
  const eventDate = date.slice(0, 10)

  // 退款彈窗提示
  const refundModalRef = useRef<HTMLInputElement>(null);

  // QR code 票卷image url
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>('')
  const qrCodeModalRef = useRef<HTMLInputElement>(null);

  // 產生QR code API
  const { trigger: postOrderQRcode, isMutating: isMutatingQRcode } =
    usePostMemberOrdersQRcode();

  // 訂單退款 API
  const { trigger: postOrderRefund, isMutating: isMutatingRefund } = useRefundMemberOrders()

  async function handleOnClickApplyQRcode(orderId: string) {
    try {
      const res = await postOrderQRcode({ orderId });
      console.log("QR CDOE res", res);

      if (!res.qr_image_url) throw new Error('沒有拿到 URL');

      setQrCodeImageUrl(res.qr_image_url)
      if (qrCodeModalRef.current) {
        setTimeout(() => qrCodeModalRef.current?.click(), 0)
      }
      toast.success("申請QR code成功");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("申請QR code失敗");
      } else {
        toast.error("申請QR code失敗");
      }

    }
  }
  function handleClickRefundButton() {
    if (refundModalRef.current) refundModalRef.current.click()
  }
  async function handleOnOrderRefund(orderId: string) {
    try {
      await postOrderRefund({ id: orderId })
      toast.success("申請退款成功");
      if (refundModalRef.current) refundModalRef.current.checked = false
      router.refresh()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("申請退款失敗");
      } else {
        toast.error("申請QR code失敗");
      }
    }
  }


  return (
    <>
      <div
        className="flex gap-4 flex-wrap md:flex-no-wrap
       items-center justify-between border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white"
      >
        {/* 圖片 + 左側內容 */}
        <div className="flex items-center gap-4">
          <ImageSkeleton
            src={imageUrl}
            alt="活動封面"
            width={50}
            height={50}
            className="min-w-20 h-20 rounded object-cover bg-gray-100"
            fallbackSrc="/main/main_bg_top_3.jpg"
          />

          <div className="ticket-left-info max-w-[300px]">
            <div
              className={clsx(
                "text-smfont-semibold mb-1",
                ticketStatusColor[status]
              )}
            >
              {ticketStatusMap[status]}
            </div>
            <div className="font-bold text-gray-800">{title}</div>
            <div className="text-sm text-gray-500 mt-1">{planName}</div>
            <div className="text-xs text-gray-400 mt-1">
              訂單編號：{orderNumber}
            </div>
          </div>
        </div>

        {/* 右側內容 */}
        <div className="text-right">
          <div className="ticket_date_price w-fit flex space-x-4 items-start justify-between lg:space-x-0 lg:flex-col">
            <div className="text-gray-400 text-sm mb-1">
              活動日期: {eventDate}
            </div>
            <div className="text-primary-500 font-bold mb-2">NT${price}</div>
          </div>
          <div className="hidden md:block flex space-x-2 justify-end">
            {status !== "refunded" && (
              <button
                className="cursor-pointer text-sm text-white bg-primary-500 px-3 py-1 
              rounded hover:bg-primary-600"
                onClick={() => handleOnClickApplyQRcode(orderNumber)}
              >
                {isMutatingQRcode ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "申請QR code"
                )}
              </button>
            )}

            {status === "finished" && (
              <button className="cursor-pointer text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
                發表評論
              </button>
            )}
            {status === "incoming" && (
              <button className="cursor-pointer text-sm text-gray-700 border 
              border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                onClick={handleClickRefundButton}
              >
                申請退款
              </button>
            )}
          </div>
        </div>
        {/* 手機按鈕區 */}
        <div className="mobile_btn_wrap flex-grow-1 flex gap-4 justify-end md:hidden">
          {(status !== "refunded" || "finished") && (
            <button
              className="cursor-pointer text-sm text-white bg-primary-500 
            px-3 py-1 rounded hover:bg-primary-600"
              onClick={() => handleOnClickApplyQRcode(orderNumber)}
            >
              {isMutatingQRcode ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "申請QR code"
              )}
            </button>
          )}

          {status === "finished" && (
            <button className="cursor-pointer text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
              發表評論
            </button>
          )}
          {status === "incoming" && (
            <button className="cursor-pointer text-sm text-gray-700 border 
            border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
              onClick={handleClickRefundButton}
            >
              申請退款
            </button>
          )}
        </div>
        <DialogModal id={orderNumber} modalRef={qrCodeModalRef} >
          <div className="download_qr_code flex space-y-2 flex-col items-center">
            <ImageSkeleton
              src={qrCodeImageUrl || '/main/main_bg_top_3.jpg'}
              alt="QR code"
              width={300}
              height={300}
            />
            <a
              href={qrCodeImageUrl}
              download={`${title}-${eventDate}-${orderNumber}_qr.png`}
              rel="noopener noreferrer"
              className="btn-primary mt-4 block text-center text-white py-2 rounded-lg bg-primary-500 hover:bg-primary-600"
            >
              下載 QR code
            </a>
          </div>
        </DialogModal>

        <DialogModal id={`${orderNumber}-refunded`} modalRef={refundModalRef}>
          <div className="refunf_info flex flex-col items-end space-y-4">
            <p className="heading-5 text-primary-500">
              退款申請成功後， 系統會在約 1 分鐘後自動為您退款，請稍後
            </p>
            <button className="btn-primary" onClick={() => handleOnOrderRefund(orderNumber)}>確定</button>
          </div>
        </DialogModal>
      </div>
    </>
  );
}
