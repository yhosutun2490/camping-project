"use client";
import ImageSkeleton from "@/components/ImageSkeleton";
import BadgeStatus from "@/components/Admin/BadgeStatus";
import ApproveButtonList from "@/components/Admin/ApproveButtonList";
import DialogModal from "@/components/DialogModal";
import ActivityModalContent from "@/components/Admin/ActivityModalContent";
import type { EventSummary, EventPhoto, EventDetail } from "@/types/api/admin";
import { useAdminEventFetcher } from "@/swr/admin/event/useAdminEvent";
import { useRef, useId, useState } from "react";

interface Props {
  event: EventSummary;
}
export default function ReviewActivityInfoMobile({ event }: Props) {
  const planMaxPrice = event.max_price;
  const imagesModalRef = useRef<HTMLInputElement>(null);
  const eventContentModalRef = useRef<HTMLInputElement>(null);
  // 取得活動單一資料swr
  const { trigger: getAdminEventById } = useAdminEventFetcher();

  const uid = useId(); // 產生全域唯一、且穩定的 ID
  const imagesId = `${uid}-${event.id}`; // 行動版圖片 modal
  const contentId = `${uid}-${event.id}-content`; // 行動版文案 modal

  // 審核圖片資料
  const [photoDetail, setPhotoDetail] = useState<EventPhoto[]>([]);

  type EditableKeys =
    | "id"
    | "title"
    | "cancel_policy"
    | "description"
    | "eventPlanBox"; // 同上，若 plans 在別的巢狀就另外定義

  type EventContent = Partial<Pick<EventDetail, EditableKeys>>;

  // 審核內容資料
  const [contentDetail, setContentDetail] = useState<EventContent>({
    id: "",
    title: "",
    cancel_policy: "",
    description: "",
    eventPlanBox: [],
  });

  function sliceDate(date: string): string {
    return date.slice(0, 10);
  }

  async function handleOpenImageModal(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      const res = await getAdminEventById({ eventId: event.id });
      const photoBox = res.data.eventPhotoBox;
      setPhotoDetail(photoBox);
      if (imagesModalRef.current) imagesModalRef.current.click();
    } catch (err) {
      console.log("取得活動image有誤", err);
    }
  }

  async function handleOpenContentModal(e: React.MouseEvent) {
    e.stopPropagation();
    try {
      const res = await getAdminEventById({ eventId: event.id });
      const eventData = res.data;
      const contentBox = {
        id: eventData.id,
        title: eventData.title,
        cancel_policy: eventData.cancel_policy,
        description: eventData.description,
        eventPlanBox: eventData.eventPlanBox,
      };
      setContentDetail(contentBox);
      if (eventContentModalRef.current) eventContentModalRef.current.click();
    } catch (err) {
      console.log("取得活動內容有誤", err);
    }
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
            onClick={handleOpenImageModal}
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
                onClick={handleOpenContentModal}
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
        <ApproveButtonList eventId={event.id} className="flex-row justify-between mb-4 px-4" />
      </div>
      <DialogModal id={contentId} modalRef={eventContentModalRef}>
        <ActivityModalContent
          handleCloseContentModal={handleCloseContentModal}
          content={{
            id: contentDetail.id ?? "",
            title: contentDetail.title ?? "",
            cancel_policy: contentDetail.cancel_policy ?? "",
            description: contentDetail.description ?? "",
            eventPlanBox: contentDetail.eventPlanBox ?? [],
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
