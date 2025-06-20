import type { EventInfo } from "@/types/api/event/eventById";
import ImageSkeleton from "@/components/ImageSkeleton";
import BadgeStatus from "@/components/Admin/BadgeStatus";
import ApproveButtonList from "@/components/Admin/ApproveButtonList";
import DialogModal from "@/components/DialogModal";
import ActivityModalContent from "@/components/Admin/ActivityModalContent";
import { useRef } from "react";

interface Props {
  event: EventInfo;
}
export default function ReviewActivityInfoMobile({ event }: Props) {
  const planMaxPrice = Math.max(...event.plans.map((p) => p.price));
  const imagesModalRef = useRef<HTMLInputElement>(null);
  const eventContentModalRef = useRef<HTMLInputElement>(null);
  function sliceDate(date: string): string {
    return date.slice(0, 10);
  }

  function handleClickCover(e: React.MouseEvent) {
    e.stopPropagation();
    if (imagesModalRef.current) imagesModalRef.current?.click();
  }

  function handleClickContent(e: React.MouseEvent) {
    e.stopPropagation();
    if (eventContentModalRef.current) eventContentModalRef.current?.click();
  }

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
    <div className="w-full bg-none border-1 border-primary-300 rounded-2xl">
      <div className="collapse collapse-arrow join-item">
        <input type="checkbox" />
        <div className="z-5 collapse-title flex gap-[12px] text-sm md:heading-5 text-neutral-950 pointer-events-none">
          <label
            htmlFor={`${event.id}`}
            className="cursor-pointer relative pointer-events-auto h-25"
            onClick={handleClickCover}
          >
            <ImageSkeleton
              key={event.id}
              src={event.photos[0].photo_url}
              alt={event.title}
              width={80}
              height={48}
              fallbackSrc="/main/main_bg_top_3.jpg"
              className="min-w-25 h-25 object-cover rounded-2xl"
            />
            {event.photos.length > 1 && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {event.photos.length} 張 (點選查看)
              </span>
            )}
          </label>
          <div className="event_title_info space-y-2">
            <p className="text-neutral-950 text-sm">{event.title}</p>
            <div className="flex gap-4">
              <BadgeStatus
                status={event.active === "pending" ? "pending" : "reject"}
              />
              <label
                htmlFor={`${event.id}-content`}
                className="cursor-pointer pointer-events-auto"
                onClick={handleClickContent}
              >
                <span
                  className="underline 
          text-gray-500 whitespace-nowrap cursor-pointer"
                >
                  詳細文案內容
                </span>
              </label>
            </div>

            <p className="text-neutral-700 line-clamp-3">{event.description}</p>
          </div>
        </div>
        <div className="collapse-content text-sm">
          {/* 日期  */}
          <div className="text-start text-neutral-500 flex gap-2">
            <p className="heading-6">日期:</p>
            <span>{sliceDate(event.start_time)}</span> ~{" "}
            <span>{sliceDate(event.end_time)}</span>
          </div>
          {/* 名額  */}
          <div className="text-start text-neutral-500 flex gap-2">
            <p className="heading-6">名額:</p>
            <span>{event.max_participants}</span>
          </div>
          {/* 方案最大價格 */}
          <div className="text-start text-neutral-500 flex gap-2">
            <p className="heading-6 ">價格:</p>
            <span>{planMaxPrice}</span>
          </div>
        </div>
        <ApproveButtonList className="flex-row justify-between mb-4 px-4" />
      </div>
      <DialogModal id={`${event.id}-content`} modalRef={eventContentModalRef}>
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
      <DialogModal id={`${event.id}`} modalRef={imagesModalRef}>
        <div className="event_photos_details flex flex-col space-y-2 items-center">
          <div className="w-full heading-5 flex justify-between items-center text-primary-500">
            <p>活動圖片</p>
            <button className="btn-primary" onClick={handleCloseImagesModal}>
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
  );
}
