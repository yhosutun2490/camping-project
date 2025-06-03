import Image from "next/image";
import BackgroundSlider from "@/components/BackgroundSlider";

interface Props {
  event_images: string[];
}

export default function EventCoverGrid({ event_images }: Props) {
  return (
    <div id="total" className="w-full h-full">
      {/* 桌機顯示 Grid，手機隱藏 */}
      <div className="event_cover_grid hidden md:grid w-full h-[636px] grid-cols-2 grid-rows-2 gap-5 2xl:gap-10">
        {event_images.map((src, index) => {
          const isMainImage = index === 0;
          return (
            <figure
              key={index}
              className={`relative h-full ${
                isMainImage ? "col-span-2 md:col-span-1 row-span-2" : "block"
              }`}
            >
              <Image
                src={src}
                fill
                sizes="100%"
                alt={`cover-${index}`}
                className="object-cover rounded-lg"
              />
            </figure>
          );
        })}
      </div>

      {/* 手機 Slider 滿版 */}
      <div className="md:hidden relative left-1/2 right-1/2 -translate-x-1/2 w-screen max-w-none">
        <BackgroundSlider slides={event_images} />
      </div>
    </div>
  );
}
