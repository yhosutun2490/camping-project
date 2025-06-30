"use client";
import Image from "next/image";
import CarouselSlider from "@/components/CarouselSlider";
import EventCard from "@/components/EventCard";
import type { EventItem } from "@/types/api/event/recommend"

interface Props {
  data: EventItem[]
}
export default function RecommendSlider({ data }: Props) {

  return (
    <div className="h-[100%]">
      <CarouselSlider
        sliderData={data}
        renderSlide={(event: EventItem, idx: number) => (
          <div key={idx} className="relative overflow-visible">
            <div className="absolute -top-[24px] right-[-16px] w-[48px] h-[48px] z-1">
              <Image
                src="/main/crown.svg"
                alt="crown"
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center font-bold text-base text-white">
                {idx + 1}
              </span>
            </div>

            <EventCard
              id={event.id}
              date={{
                start: event.start_time ?? "",
                end: event.end_time ?? ""
              }}
              title={event.title}
              image={event.photos}
              price={String(event.discounted_price)}
              address={event.address}
              total_signup={event.total_signup}
              max_participants={event.max_participants}
            />
          </div>
        )}
      ></CarouselSlider>
    </div>
  );
}
