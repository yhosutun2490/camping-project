import type { EventInfo } from "@/types/api/event/eventById";
import ImageSkeleton from "@/components/ImageSkeleton";
import BadgeStatus from "@/components/Admin/BadgeStatus";
import ApproveButtonList from "@/components/Admin/ApproveButtonList";
import clsx from "clsx";
import DialogModal from "@/components/DialogModal";
import ActivityModalContent from "@/components/Admin/ActivityModalContent";
import { useRef } from "react";

interface Props {
  event: EventInfo;
}

function sliceDate(date: string): string {
  return date.slice(0, 10);
}

export default function ReviewActivityRow({ event }: Props) {
  const planMaxPrice = Math.max(...event.plans.map((p) => p.price));
  const imagesModalRef = useRef<HTMLInputElement>(null);
  const eventContentModalRef = useRef<HTMLInputElement>(null);

  function handleCloseImagesModal(e: React.MouseEvent) {
    e.stopPropagation();
    if (imagesModalRef.current) {
      imagesModalRef.current.checked = false;
    }
  }
  function handleCloseContentModal() {
    if (eventContentModalRef.current) {
      eventContentModalRef.current.checked = false;
    }
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-[70px_2fr_50px_70px_80px_100px]",
        "items-center gap-4 border-b py-4 text-neutral-950"
      )}
    >
      {/* 日期 */}
      <div className="text-xs leading-5">
        <div>{sliceDate(event.start_time)}</div>
        <div>{sliceDate(event.end_time)}</div>
      </div>

      {/* 活動內容（圖片 + 文案） */}
      <div className="flex flex-col items-start gap-3">
        <div className="relative image_row flex flex-wrap gap-2 cursor-pointer rounded-2xl">
          <label htmlFor={event.id} className="cursor-pointer">
            <ImageSkeleton
              key={event.id}
              src={event.photos[0].photo_url}
              alt={event.title}
              width={80}
              height={48}
              fallbackSrc="/main/main_bg_top_3.jpg"
              className="w-40 h-25 object-cover rounded-2xl"
            />
            {event.photos.length > 1 && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {event.photos.length} 張 (點選查看)
              </span>
            )}
          </label>

          <DialogModal id={event.id} modalRef={imagesModalRef}>
            <div className="event_photos_details flex flex-col space-y-2 items-center">
              <div className="w-full heading-5 flex justify-between items-center text-primary-500">
                <p>活動圖片</p>
                <button
                  className="btn-primary"
                  onClick={handleCloseImagesModal}
                >
                  關閉
                </button>
              </div>

              {event.photos.map((item) => (
                <div
                  className="event_photo_single flex flex-col items-center space-y-2"
                  key={item.id}
                >
                  <ImageSkeleton
                    src={item.photo_url}
                    alt={item.id}
                    width={80}
                    height={48}
                    fallbackSrc="/main/main_bg_top_3.jpg"
                    className="w-70 h-40 object-cover rounded-2xl"
                  />
                  <p className="photo_description heading-7 text-neutral-950">
                    {item.description || "無描述"}
                  </p>
                </div>
              ))}
            </div>
          </DialogModal>
        </div>

        <div className="flex flex-wrap space-x-2 items-center">
          <p className="heading-7 text-neutral-950">{event.title}</p>
          <label htmlFor={`${event.id}-content`} className="cursor-pointer">
            <span
              className="underline text-sm
          text-gray-500 whitespace-nowrap cursor-pointer"
            >
              詳細文案內容
            </span>
          </label>
          <DialogModal
            id={`${event.id}-content`}
            modalRef={eventContentModalRef}
          >
            <ActivityModalContent
              handleCloseContentModal={handleCloseContentModal}
              content={{
                id: event.id,
                title: event.title,
                cancel_policy: event.cancel_policy,
                description: event.description,
                notices: event.notices,
                plans: event.plans,
              }}
            />
          </DialogModal>
        </div>
      </div>

      {/* 名額  */}
      <div className="text-start font-medium">{event.max_participants}</div>
      {/* 方案最大價格 */}
      <div className="text-start">{planMaxPrice}</div>

      {/* 狀態 badge */}
      <div className="flex justify-start">
        <BadgeStatus
          status={event.active === "pending" ? "pending" : "reject"}
        />
      </div>

      {/* 操作按鈕 */}
      <ApproveButtonList />
    </div>
  );
}
