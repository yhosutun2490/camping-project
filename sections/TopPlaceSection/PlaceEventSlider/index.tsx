"use client";
import ImageSkeleton from "@/components/ImageSkeleton";
import CarouselSlider from "@/components/CarouselSlider";
import { useRouter } from "next/navigation";

export interface TopPlace {
  id: string;
  location: string;
  places: {
    event_Id: string;
    camp_name: string;
    image: string;
    description: string;
  }[];
}

type TopPlaceData = TopPlace[];

interface Props {
  data: TopPlaceData;
}

export default function PlaceEventSlider({ data }: Props) {
  const router = useRouter()

  function handleClickCard(eventId: string) {
    router.push(`/event/${eventId}`)
  }

  return (
    <div className="className=h-[100%]">
      <CarouselSlider
        sliderData={data}
        bgClass={"place_slider bg-primary-50 rounded-xl p-[1rem] md:p-[2rem]"}
        hasDivider={true}
        renderSlide={(item, idx) => (
          <div key={idx} className="relative space-y-4 overflow-visible">
            <p className="heading-3 text-start">{item.location}</p>
            <div className="place_list_col space-y-4 max-w-[362px]">
              {item.places.map((place, idx2) => {
                return (
                  <div
                    className="place_info_card relative"
                    key={place.camp_name + idx2}
                    onClick={() => handleClickCard(place.event_Id)}
                  >
                    <figure className="w-full relative overflow-hidden rounded-xl">
                      <ImageSkeleton
                        src={place.image}
                        alt={place.camp_name}
                        width={362}
                        height={204}
                        fallbackSrc="/main/main_bg_top_3.jpg"
                        className="w-full h-full object-cover aspect-[5/3] rounded-xl overflow-hidden 
                        hover:scale-115 hover:rounded-xl transition-transform duration-300 cursor-pointer"
                      />
                      <div className="place_info_text absolute w-[80%] text-start left-[5%] bottom-[10px]">
                        <p className="heading-4 text-white line-clamp-1">{place.camp_name}</p>
                        <p className="text-base text-white overflow-hidden truncate">
                          {place.description}
                        </p>
                      </div>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      ></CarouselSlider>
    </div>
  );
}
