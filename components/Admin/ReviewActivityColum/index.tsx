"use client"
import ImageSkeleton from "@/components/ImageSkeleton";
import BadgeStatus from "@/components/Admin/BadgeStatus";
import ApproveButtonList from "@/components/Admin/ApproveButtonList";
import clsx from "clsx";
import DialogModal from "@/components/DialogModal";
import ActivityModalContent from "@/components/Admin/ActivityModalContent";
import { useRef, useState } from "react";
import type {EventSummary,EventPhoto,EventDetail} from "@/types/api/admin"
import { useAdminEventFetcher } from '@/swr/admin/event/useAdminEvent'


interface Props {
  event: EventSummary;
}

function sliceDate(date: string): string {
  return date.slice(0, 10);
}

export default function ReviewActivityRow({ event }: Props) {
  const planMaxPrice = event.max_price;
  const imagesModalRef = useRef<HTMLInputElement>(null);
  const eventContentModalRef = useRef<HTMLInputElement>(null);

  // 取得活動單一資料swr
  const {trigger:getAdminEventById} = useAdminEventFetcher()
  
  // 審核圖片資料
  const [photoDetail, setPhotoDetail] = useState<EventPhoto[]>([]);

  type EditableKeys =
  | 'id'
  | 'title'
  | 'cancel_policy'
  | 'description'
  | 'eventPlanBox';        // 同上，若 plans 在別的巢狀就另外定義


  type EventContent = Partial<Pick<EventDetail, EditableKeys>>;

  // 審核內容資料
  const [contentDetail, setContentDetail] = useState<EventContent>({
      id:  "",
      title: "",
      cancel_policy: "",
      description: "",
      eventPlanBox: []
  });


  async function handleOpenImageModal (e: React.MouseEvent) {
    e.stopPropagation();
    try {
      const res = await getAdminEventById({ eventId: event.id })
      const photoBox = res.data.eventPhotoBox
      setPhotoDetail(photoBox)
      if (imagesModalRef.current) imagesModalRef.current.click()
    } catch(err) {
      console.log("取得活動image有誤",err)
    }
  }

  async function handleOpenContentModal (e: React.MouseEvent) {
    e.stopPropagation();
    try {
      const res = await getAdminEventById({ eventId: event.id })
      const eventData = res.data
      const contentBox = {
          id: eventData.id,
          title: eventData.title,
          cancel_policy: eventData.cancel_policy,
          description: eventData.description,
          eventPlanBox: eventData.eventPlanBox
      }
      setContentDetail(contentBox)
      if (eventContentModalRef.current) eventContentModalRef.current.click()
    } catch(err) {
      console.log("取得活動內容有誤",err)
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
    <div
      className={clsx(
        "grid grid-cols-[70px_2fr_50px_70px_80px_100px]",
        "items-center gap-4 border-b py-4 text-neutral-950"
      )}
    >
      {/* 日期 */}
      <div className="text-xs leading-5">
        <div>{sliceDate(event.start_date)}</div>
        <div>{sliceDate(event.end_date)}</div>
      </div>

      {/* 活動內容（圖片 + 文案） */}
      <div className="flex flex-col items-start gap-3">
        <div className="relative image_row flex flex-wrap gap-2 cursor-pointer rounded-2xl">
          <label className="cursor-pointer" onClick={handleOpenImageModal}>
            <ImageSkeleton
              key={event.id}
              src={event.cover_photo_url ?? '/main/main_bg_top_3.jpg'}
              alt={event.title}
              width={80}
              height={48}
              fallbackSrc="/main/main_bg_top_3.jpg"
              className="w-40 h-25 object-cover rounded-2xl"
            />
            {event.photo_count > 1 && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {event.photo_count} 張 (點選查看)
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

              {photoDetail.map((item) => (
                <div
                  className="event_photo_single flex flex-col items-center space-y-2"
                  key={item.id}
                >
                  <ImageSkeleton
                    src={item?.photo_url ?? '/main/main_bg_top_3.jpg'}
                    alt={item?.id}
                    width={80}
                    height={48}
                    fallbackSrc="/main/main_bg_top_3.jpg"
                    className="w-70 h-40 object-cover rounded-2xl"
                  />
                  <p className="photo_description heading-7 text-neutral-950">
                    {item?.description || "無描述"}
                  </p>
                </div>
              ))}
            </div>
          </DialogModal>
        </div>

        <div className="flex flex-col space-x-2 items-start">
          <p className="heading-7 text-neutral-950">{event.title}</p>
          <label className="cursor-pointer" onClick={handleOpenContentModal}>
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
                id: contentDetail.id ?? "",
                title: contentDetail.title ?? "",
                cancel_policy: contentDetail.cancel_policy ?? "",
                description: contentDetail.description ?? "",
                eventPlanBox: contentDetail.eventPlanBox ?? []
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
          status={event.active_status}
        />
      </div>

      {/* 操作按鈕 */}
      <ApproveButtonList eventId={event.id}/>
    </div>
  );
}
