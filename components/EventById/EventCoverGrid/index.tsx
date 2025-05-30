import Image from "next/image";
export default function EventCoverGrid() {
  return (
    <div id="total" className="event_cover_grid h-full grid grid-cols-2 grid-rows-2 gap-5 2xl:gap-10">
      {/* 左側大圖：橫跨兩列 */}
      <figure className="relative col-span-2 md:col-span-1 row-span-2 h-full">
        <Image
          src="/main/main_bg_top_3.jpg"
          fill
          sizes="100%"
          alt="cover"
          className="object-cover rounded-lg"
        />
      </figure>

      {/* 右上圖 */}
      <figure className="hidden md:block relative h-full">
        <Image
          src="/main/main_bg_top_3.jpg"
          fill
          sizes="100%"
          alt="cover"
          className="object-cover rounded-lg"
        />
      </figure>

      {/* 右下圖 */}
      <figure className="hidden md:block relative h-full">
        <Image
          src="/main/main_bg_top_3.jpg"
          fill
          sizes="100%"
          alt="cover"
          className="object-cover rounded-lg"
        />
      </figure>
    </div>
  );
}
