
import BackgroundSlider from "@/components/BackgroundSlider";
import ImageSkeleton from "@/components/ImageSkeleton";

interface Props {
  event_images: string[];
}

export default function EventCoverGrid({ event_images }: Props) {
  return (
    <div id="total" className="w-full h-full">
      {/* 桌機顯示 Grid，手機隱藏 */}
      <div className="event_cover_grid hidden md:grid w-full h-[58dvh] grid-cols-2 grid-rows-2 gap-5 2xl:gap-10">
        {event_images.map((src, index) => {
          const isMainImage = index === 0;
          return (
            <figure
              key={index}
              className={`relative h-full ${
                isMainImage ? "col-span-2 md:col-span-1 row-span-2" : "block"
              }`}
            >
              <ImageSkeleton
                src={src}
                alt={`cover-${index}`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover rounded-lg"
                fallbackSrc="/main/main_bg_top_3.jpg"
              />
            </figure>
          );
        })}
      </div>

      {/* 手機 Slider 滿版 */}
      <div className="md:hidden relative left-1/2 right-1/2 -translate-x-1/2 w-screen  max-w-none">
        <BackgroundSlider slides={event_images} className="h-[375px]" />
      </div>
    </div>
  );
}
