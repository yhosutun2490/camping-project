"use client";
import { useRouter } from "next/navigation";
import ImageSkeleton from "../ImageSkeleton";
import type {Event} from "@/types/api/event/allEvents"
import clsx from "clsx";

interface Props {
  id?: string;
  date?: {
    start: string;
    end: string;
  };
  image?: string[];
  category?: string;
  title?: string;
  price?: string;
  address?: string;
  tags?: string[];
  max_participants?: number,
  total_signup?: number,
  status?: Event['status']
}

export default function EventCard({
  id,
  date = {
    start: "2025-05-05",
    end: "2025-06-30",
  },
  image,
  title = "",
  price = "",
  max_participants,
  total_signup,
  address = "",
  tags = [],
  status
}: Props) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份從 0 開始，要 +1
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

   const registerStatusTextMap: Record<Event["status"], string> = {
    preparing: "尚未開始報名",
    registering: "報名中",
    full: "已額滿",
    expired: "已截止報名",
    refunding: "退款中",
    cancelled: "活動已取消",
    finished: "活動已結束",
  };


  const router = useRouter();
  return (
    <div className="card bg-white w-full max-w-full h-full p-8 shadow-sm flex flex-col gap-2">
      <div className="date_info flex text-base justify-between items-center">
        <p className="text-neutral-700">
          {formatDate(date?.start)} - {formatDate(date?.end)}
        </p>
        <p className="text-primary-500 font-semibold">
          報名人數: {total_signup} / {max_participants}
        </p>
      </div>

      <figure className="w-full max-h-[180px] relative aspect-[3/2] overflow-hidden rounded-xl">
        <ImageSkeleton
          src={image?.[0] || "/event/event_1.png"}
          alt="event"
          fill
          sizes="100%"
          priority
          fallbackSrc="/event/event_1.png" // 提前準備一張小圖
          className="rounded-xl w-full object-cover hover:scale-115 transition-transform duration-300"
        />
        <div
          className="absolute badge border-none bg-primary-100 text-primary-500 
        top-11 right-0 rounded-r-none"
        >
          {address.slice(0, 3)}
        </div>
        {status && <div
          className={clsx(`absolute badge border-none text-white
        top-4 right-0 rounded-r-none`, status !=='registering'?'bg-orange-300':'bg-primary-500')}
        >
          {registerStatusTextMap[status]}
        </div>}
      </figure>

      <div className="card-body p-0 flex flex-col gap-2">
        <h2 className="card-title text-2xl text-neutral-950 line-clamp-1">
          {title}
        </h2>
        <div className="tags flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div className="badge text-white bg-primary-300 border-0 text-sm" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <div className="price flex items-baseline mt-auto">
          <span className="text-xl text-primary-500 font-bold">
            NT$ {price}
          </span>
          <span className="text-base text-neutral-700 pl-2">/ 每人</span>
        </div>
        <div
          className="card-actions"
          onClick={() => router.push(`event/${id}`)}
        >
          <button className="w-full btn-primary">更多資訊</button>
        </div>
      </div>
    </div>
  );
}
