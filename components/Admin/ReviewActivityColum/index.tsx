import type { EventInfo } from "@/types/api/event/eventById";
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import ImageSkeleton from "@/components/ImageSkeleton";
import clsx from "clsx";

interface Props {
  event: EventInfo;
}

function sliceDate(date:string):string {
    return date.slice(0,10)
}

export default function ReviewActivityRow({ event }: Props) {
  const planMaxPrice = Math.max(...event.plans.map((p) => p.price));

  return (
    <div
      className={clsx(
        "grid grid-cols-[70px_2fr_50px_50px_80px_100px]",
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
        <div className="image_row flex gap-2">
          {event.photos.map((item) => {
            return (
              <ImageSkeleton
                key={item.id}
                src={item.photo_url}
                alt={event.title}
                width={64}
                height={48}
                fallbackSrc="/main/main_bg_top_3.jpg"
                className="h-12 w-16 rounded object-cover cursor-pointer"
              />
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="font-medium">{event.title}</p>
          <p className="line-clamp-1 text-xs text-neutral-500">
            {event.description}
          </p>
        </div>
      </div>

      {/* 名額  */}
      <div className="text-center font-medium">{event.max_participants}</div>
      {/* 方案最大價格 */}
      <div className="text-center">{planMaxPrice}</div>

      {/* 狀態 badge */}
      <div className="flex justify-center">
        {event.active === "pending" && (
          <span className="rounded bg-yellow-50 px-2 py-0.5 text-xs text-yellow-600">
            待審核
          </span>
        )}
        {event.active === "reject" && (
          <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-600">
            已退回
          </span>
        )}
      </div>

      {/* 操作按鈕 */}
      <div className="flex flex-col items-center justify-center gap-2">
        <button className="btn-primary text-xs h-8 flex items-center gap-1">
          <IconWrapper icon="mdi:check" className="text-white"></IconWrapper>
          通過
        </button>
        <button className="btn-error text-xs h-8 flex items-center gap-1">
          <IconWrapper icon="mdi:close" className="text-white"></IconWrapper>
          退回
        </button>
      </div>
    </div>
  );
}
