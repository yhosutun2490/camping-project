"use client";

import { Icon } from "@iconify/react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props<T> {
  sliderData?: T[];
  bgClass?: string;
  hasDivider?: boolean;
  renderSlide?: (item: T, index: number) => React.ReactNode;
}

export default function CarouselSlider<T>({
  sliderData,
  bgClass,
  hasDivider,
  renderSlide,
}: Props<T>) {
  // 目前觀看的slider
  const [currentSlide, setCurrentSlide] = useState<number>(0);
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
    <div className={clsx("relative w-full mx-auto lg:min-w-[700px] w-[100%] h-full mx-auto",bgClass)}>
      <div className="w-full h-full overflow-x-clip overflow-y-visible" ref={emblaRef}>
        {/* 只 map 一次 */}

        <div className="flex w-full h-full">
          {sliderData?.map((item, idx) => {
            const isActive =  idx > currentSlide && idx <= currentSlide + 2;
            return (
              <div key={idx} className={clsx(
                  "relative flex-none min-w-[280px] w-[90%] sm:w-1/2 lg:w-1/3 h-full px-2 md:px-4 box-border",
                  // 👉 2. 只有 active 的才加分隔線
                  isActive && hasDivider
                    ? "border-l-2 border-white"
                    : "border-none"
                )}>
                {renderSlide && renderSlide(item, idx)}
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="absolute cursor-pointer hidden sm:block left-[-7%] top-1/2 translate-y-[-50%] w-10 h-10 p-2 bg-white rounded-full border-2 border-neutral-900 hover:bg-white/50"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <Icon icon="ri:arrow-left-line" width={20} height={20} />
      </button>
      <button
        className="absolute cursor-pointer hidden sm:block right-[-7%] top-1/2 translate-y-[-50%] w-10 h-10 p-2 bg-white rounded-full border-2 border-neutral-900 hover:bg-white/50"
        onClick={() => emblaApi?.scrollNext()}
      >
        <Icon icon="ri:arrow-right-line" width={20} height={20} />
      </button>
    </div>
  );
}
