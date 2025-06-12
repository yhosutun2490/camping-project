"use client";
import { useRouter } from "next/navigation";
import ImageSkeleton from "../ImageSkeleton";

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
  person?: {
    subscribed: number;
    max: number;
  };
  address?: string;
  tags?: string[];
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
  person = {
    subscribed: 0,
    max: 30,
  },
  address = "",
  tags = [],
}: Props) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 月份從 0 開始，要 +1
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}`;
  };

  const router = useRouter();
  return (
    <div className="card bg-white w-full max-w-full h-full p-8 shadow-sm flex flex-col gap-2">
      <div className="date_info flex text-base justify-between items-center">
        <p className="text-neutral-700">
          {formatDate(date?.start)} - {formatDate(date?.end)}
        </p>
        <p className="text-primary-500 font-semibold">
          報名人數: {person?.subscribed} / {person?.max}
        </p>
      </div>

      <figure className="w-full max-h-[180px] relative aspect-[3/2] overflow-hidden rounded-xl">
        <ImageSkeleton
          src={image?.[0] || "/event/event_1.png"}
          alt="event"
          fill
          priority
          fallbackSrc="/event/event_1.png" // 提前準備一張小圖
          className="rounded-xl w-full object-cover hover:scale-115 transition-transform duration-300"
        />
        <div
          className="absolute badge border-none bg-primary-100 text-primary-500 
        top-6 right-0 rounded-r-none"
        >
          {address.slice(0, 3)}
        </div>
      </figure>

      <div className="card-body p-0 flex flex-col gap-2">
        <h2 className="card-title text-2xl text-neutral-950 line-clamp-1">
          {title}
        </h2>
        <div className="tags flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div className="badge bg-primary-300 border-0 text-sm" key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <div className="price flex items-baseline">
          <span className="text-xl text-primary-500 font-bold">
            NT$ {price}
          </span>
          <span className="text-base text-neutral-700 pl-2">/ 每人</span>
        </div>
        <div
          className="card-actions mt-auto"
          onClick={() => router.push(`event/${id}`)}
        >
          <button className="w-full btn-primary">更多資訊</button>
        </div>
      </div>
    </div>
  );
}
