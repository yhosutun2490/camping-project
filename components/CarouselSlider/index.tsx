"use client";

import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

interface Props<T> {
  sliderData?: T[];
  renderSlide?: (item: T, index: number) => React.ReactNode;
}

export default function CarouselSlider<T>({
  sliderData,
  renderSlide,
}: Props<T>) {
  // 目前觀看的slider
  const [, setCurrentSlide] = useState<number>(0);
  // 設定 loop、自動播放速度等等
  const [emblaRef, emblaApi] = useEmblaCarousel({
    skipSnaps: true,
    containScroll: "trimSnaps",
    align: "center",
  });

  // 註冊active slider註冊active slider
  useEffect(() => {
    if (!emblaApi) return;

    // 初始執行一次，保證 currentSlide 正確
    setCurrentSlide(emblaApi.selectedScrollSnap());

    // 每當選到新 slide，觸發 onSelect
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full mx-auto lg:min-w-[700px] w-[100%] h-full mx-auto h-full">
      <div className="w-full overflow-x-clip overflow-y-visible" ref={emblaRef}>
        {/* 只 map 一次 */}

        <div className="flex w-full">
          {sliderData?.map((item, idx) => {

          return (
            <div key={idx} className="relative flex-none w-1/3 px-4 box-border">
              {renderSlide && renderSlide(item, idx)}
            </div>
          );
          })}
        </div>
      </div>
      <button
        className="absolute left-[-7%] top-1/2 translate-y-[-50%] w-10 h-10 p-2 bg-white rounded-full border-2 border-neutral-900 hover:bg-white/50"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <Icon icon="ri:arrow-left-line" width={20} height={20} />
      </button>
      <button
        className="absolute right-[-7%] top-1/2 translate-y-[-50%] w-10 h-10 p-2 bg-white rounded-full border-2 border-neutral-900 hover:bg-white/50"
        onClick={() => emblaApi?.scrollNext()}
      >
        <Icon icon="ri:arrow-right-line" width={20} height={20} />
      </button>
    </div>
  );
}
