"use client";
import type { EventSummary } from "@/types/api/admin";
import ImageSkeleton from "@/components/ImageSkeleton";
import BadgeStatus from "@/components/Admin/BadgeStatus";
import ApproveButtonList from "@/components/Admin/ApproveButtonList";
import DialogModal from "@/components/DialogModal";
import ActivityModalContent from "@/components/Admin/ActivityModalContent";
import { useRef, useId, useState } from "react";

interface Props {
  event: EventSummary;
}
export default function ReviewActivityInfoMobile({ event }: Props) {
  const planMaxPrice = event.max_price;
  const imagesModalRef = useRef<HTMLInputElement>(null);
  const eventContentModalRef = useRef<HTMLInputElement>(null);

  const uid = useId(); // 產生全域唯一、且穩定的 ID
  const imagesId = `${uid}-${event.id}`; // 行動版圖片 modal
  const contentId = `${uid}-${event.id}-content`; // 行動版文案 modal

  // 審核圖片資料
  const [photoDetail, setPhotoDetail] = useState<
    Array<{ id: string; photo_url: string; description?: string }>
  >([]);
  const [loadingPhotos, setLoadingPhotos] = useState<boolean>(false);
  const [photoErr, setPhotoErr] = useState<string | null>(null);

  // 審核內容資料
  const [contentDetail, setContentDetail] = useState<{
    title?: string;
    cancel_policy?: string;
    description?: string;
    notices?: string;
    plans?: any;
    id?: string;
  }>({});
  const [loadingContents, setLoadingContents] = useState<boolean>(false);
  const [contentErr, seContentErr] = useState<string | null>(null);

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
            className="cursor-pointer relative pointer-events-auto h-25"
            onClick={handleClickCover}
          >
            <ImageSkeleton
              key={event.id}
              src={event.cover_photo_url}
              alt={event.title}
              width={80}
              height={48}
              fallbackSrc="/main/main_bg_top_3.jpg"
              className="min-w-25 h-25 object-cover rounded-2xl"
            />
            {event.photo_count > 1 && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {event.photo_count} 張 (點選查看)
              </span>
            )}
          </label>
          <div className="event_title_info space-y-2">
            <p className="text-neutral-950 text-sm">{event.title}</p>
            <div className="flex gap-4">
              <BadgeStatus
                status={event.active_status === "待審核" ? "pending" : "reject"}
              />
              <label
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
          </div>
        </div>
        <div className="collapse-content text-sm">
          {/* 日期  */}
          <div className="text-start text-neutral-500 flex gap-2">
            <p className="heading-6">日期:</p>
            <span>{sliceDate(event.start_date)}</span> ~{" "}
            <span>{sliceDate(event.end_date)}</span>
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
      <DialogModal id={contentId} modalRef={eventContentModalRef}>
        <ActivityModalContent
          handleCloseContentModal={handleCloseContentModal}
          content={{
            id: event.id,
            title: contentDetail.title ?? "",
            cancel_policy: contentDetail.cancel_policy ?? "",
            description: contentDetail.description ?? "",
            notices: Array.isArray(contentDetail.notices)
              ? contentDetail.notices
              : [],
            plans: contentDetail.plans ?? [],
          }}
        />
      </DialogModal>
      <DialogModal id={imagesId} modalRef={imagesModalRef}>
        <div className="event_photos_details flex flex-col space-y-2 items-center">
          <div className="w-full heading-5 flex justify-between items-center text-primary-500">
            <p>活動圖片</p>
            <button className="btn-primary" onClick={handleCloseImagesModal}>
              關閉
            </button>
          </div>

          {photoDetail.map((item) => (
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
