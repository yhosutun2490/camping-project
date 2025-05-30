"use client";
import Image from "next/image";
import CarouselSlider from "@/components/CarouselSlider";
import EventCard from "@/components/EventCard";
export default function BestActivitySection() {
  const sampleData = [
    { id: 1, title: "森中漫步", image: ["/event/event_2.png"] },
    { id: 2, title: "夜間探險", image: ["/event/event_3.png"] },
    { id: 3, title: "家庭旅遊", image: ["/event/event_1.png"] },
    { id: 1, title: "森中漫步", image: ["/event/event_3.png"] },
    { id: 2, title: "夜間探險", image: ["/event/event_2.png"] },
    { id: 3, title: "家庭旅遊", image: ["/event/event_1.png"] },
    // … 你的活動資料
  ];

  return (
    <main
      className="flex flex-col h-full relative text-neutral-950 text-4xl px-[8%] py-[40px] md:py-[5%] 
    lg:py-[12%] lg:px-[16%] flex flex-col gap-[1.5rem] lg:gap-[40px] text-center"
    >
      <p className="heading-3 md:hidden"> 超人氣精選活動</p>
      <p className="heading-1 hidden md:block"> 超人氣精選活動</p>
      <div className="h-[100%]">
        <CarouselSlider
          sliderData={sampleData}
          renderSlide={(item, idx) => (
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

              <EventCard title={item.title} image={item.image} />
            </div>
          )}
        ></CarouselSlider>
      </div>
    </main>
  );
}
