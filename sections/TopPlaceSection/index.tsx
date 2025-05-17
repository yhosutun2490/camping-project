"use client";
import Image from "next/image";
import CarouselSlider from "@/components/CarouselSlider";

export default function TopPlaceSection() {
  interface TopPlace {
    id: string;
    location: string;
    places: {
      camp_name: string;
      image: string;
      description: string;
    }[];
  }

  type TopPlaceData = TopPlace[];

  const topPlaceData: TopPlaceData = [
    {
      id: "1",
      location: "南投",
      places: [
        {
          camp_name: "清境農場露營區",
          image: "/main/place/nantou/nantou-1.png",
          description: "雲海環繞，絕美仙境",
        },
        {
          camp_name: "福壽山農場露營區",
          image: "/main/place/nantou/nantou-2.png",
          description: "四季皆美，賞花天堂",
        },
        {
          camp_name: "杉林溪露營區",
          image: "/main/place/nantou/nantou-3.png",
          description: "森林秘境，遠離塵囂",
        },
      ],
    },
    {
      id: "2",
      location: "嘉義",
      places: [
        {
          camp_name: "太平山翠峰湖露營區",
          image: "/main/place/chayi/chayi-1.png",
          description: "湖光山色，絕美夜景",
        },
        {
          camp_name: "南澳農場露營區",
          image: "/main/place/chayi/chayi-2.png",
          description: "海景相伴，療癒身心",
        },
        {
          camp_name: "阿里山達邦露營區",
          image: "/main/place/chayi/chayi-3.png",
          description: "原住民風，雲海奇觀",
        },
      ],
    },
    {
      id: "3",
      location: "台中",
      places: [
        {
          camp_name: "合歡山松雪樓露營區",
          image: "/main/place/taichung/taichung-1.png",
          description: "高山美景，星空絕佳",
        },
        {
          camp_name: "武陵農場露營區",
          image: "/main/place/taichung/taichung-2.png",
          description: "四季繽紛，櫻花勝地",
        },
        {
          camp_name: "鹿角溪露營區",
          image: "/main/place/taichung/taichung-3.png",
          description: "溪水潺潺，避暑天堂",
        },
      ],
    },
     {
      id: "4",
      location: "花蓮",
      places: [
        {
          camp_name: "清境農場露營區",
          image: "/main/place/nantou/nantou-1.png",
          description: "雲海環繞，絕美仙境",
        },
        {
          camp_name: "福壽山農場露營區",
          image: "/main/place/nantou/nantou-2.png",
          description: "四季皆美，賞花天堂",
        },
        {
          camp_name: "杉林溪露營區",
          image: "/main/place/nantou/nantou-3.png",
          description: "森林秘境，遠離塵囂",
        },
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full relative text-neutral-950 text-4xl px-[8%] py-[5%] lg:py-[12%] lg:px-[16%] flex flex-col gap-[1.25rem] lg:gap-[40px] text-center">
      <p>露營地點排行</p>
      <div className="h-[100%]">
        <CarouselSlider
          sliderData={topPlaceData}
          bgClass={"bg-primary-50 rounded-xl p-[2rem]"}
          hasDivider= {true}
          renderSlide={(item, idx) => (
            <div key={idx} className="relative space-y-4 overflow-visible">
              <p className="heading-3 text-start">{item.location}</p>
              <div className="place_list_col space-y-4 max-w-[362px]">
                {item.places.map((item) => {
                  return (
                    <div className="place_info_card relative" key={item.camp_name}>
                      <figure>
                        <Image
                          src={item.image}
                          alt={item.camp_name}
                          width={362}
                          height={204}
                          className="aspect-[5/3] rounded-xl"
                        />
                        <div className="place_info_text absolute text-start left-[5%] bottom-[5%]">
                            <p className="heading-4 text-white">{item.camp_name}</p>
                            <p className="text-base text-white">{item.description}</p>
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
    </main>
  );
}
