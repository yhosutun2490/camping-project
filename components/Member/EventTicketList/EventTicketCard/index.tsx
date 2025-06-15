"use client";
import ImageSkeleton from "@/components/ImageSkeleton";
import clsx from "clsx";

export type TicketStatus = "incoming" | "finished" | "refund";
export type EventTicket = {
  imageUrl: string;
  status: TicketStatus
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
  const ticketStatusMap: Record<"incoming" | "finished" | "refund", string> = {
    incoming: "即將到來",
    finished: "已完成",
    refund: "已取消／退款中",
  };
  const ticketStatusColor: Record<"incoming" | "finished" | "refund", string> =
    {
      incoming: "text-blue-600",
      finished: "text-green-600",
      refund: "text-red-600",
    };
  return (
    <>
      <div className="flex gap-4 flex-wrap md:flex-no-wrap
       items-center justify-between border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white">
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
          <div className="ticket_date_price w-fit flex space-x-4 justify-between lg:space-x-0 lg:flex-col">
            <div className="text-gray-400 text-sm mb-1">{date.slice(0,10)}</div>
            <div className="text-primary-500 font-bold mb-2">NT${price}</div>
          </div>
          <div className="hidden md:block flex space-x-2 justify-end">
            {status !== "refund" && (
              <button className="cursor-pointer text-sm text-white bg-primary-500 px-3 py-1 rounded hover:bg-primary-600">
                顯示 QRCode
              </button>
            )}

            {status === "finished" && (
              <button className="cursor-pointer text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
                發表評論
              </button>
            )}
            {status === "incoming" && (
              <button className="cursor-pointer text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
                申請退款
              </button>
            )}
          </div>
        </div>
        {/* 手機按鈕區 */}
        <div className="mobile_btn_wrap flex-grow-1 flex gap-4 justify-end md:hidden">
          {status !== "refund" && (
            <button className="cursor-pointer text-sm text-white bg-primary-500 px-3 py-1 rounded hover:bg-primary-600">
              顯示 QRCode
            </button>
          )}

          {status === "finished" && (
            <button className="cursor-pointer text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
              發表評論
            </button>
          )}
          {status === "incoming" && (
            <button className="cursor-pointer text-sm text-gray-700 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100">
              申請退款
            </button>
          )}
        </div>
      </div>
    </>
  );
}
