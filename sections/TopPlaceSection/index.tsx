import PlaceEventSlider from "./PlaceEventSlider";
import { getRecommendEvents } from "@/api/server-components/event/recommend"
import type {TopPlace} from "@/sections/TopPlaceSection/PlaceEventSlider"
type RawPlaceData = Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    photos: string[];
  }[]
>;

function transformPlaceData(rawData: RawPlaceData): TopPlace[] {
  return Object.entries(rawData).map(([location, events], index) => ({
    id: `top-place-${index}`, // 可改為 uuid 或其他唯一 key
    location,
    places: events.map((event) => ({
      event_Id: event.id, 
      camp_name: event.title,
      image: event.photos[0] ?? "", // 取第一張照片當主圖
      description: event.description,
    })),
  }));
}
export default async function TopPlaceSection() {
 
  const events = await getRecommendEvents()
  const topPlaceEvents = transformPlaceData(events?.groupedEvents ?? {})
 
  // const topPlaceData = [
  //   {
  //     id: "1",
  //     location: "南投",
  //     places: [
  //       {
  //         camp_name: "清境農場露營區",
  //         image: "/main/place/nantou/nantou-1.png",
  //         description: "雲海環繞，絕美仙境",
  //       },
  //       {
  //         camp_name: "福壽山農場露營區",
  //         image: "/main/place/nantou/nantou-2.png",
  //         description: "四季皆美，賞花天堂",
  //       },
  //       // {
  //       //   camp_name: "杉林溪露營區",
  //       //   image: "/main/place/nantou/nantou-3.png",
  //       //   description: "森林秘境，遠離塵囂",
  //       // },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     location: "嘉義",
  //     places: [
  //       {
  //         camp_name: "太平山翠峰湖露營區",
  //         image: "/main/place/chayi/chayi-1.png",
  //         description: "湖光山色，絕美夜景",
  //       },
  //       {
  //         camp_name: "南澳農場露營區",
  //         image: "/main/place/chayi/chayi-2.png",
  //         description: "海景相伴，療癒身心",
  //       },
  //       // {
  //       //   camp_name: "阿里山達邦露營區",
  //       //   image: "/main/place/chayi/chayi-3.png",
  //       //   description: "原住民風，雲海奇觀",
  //       // },
  //     ],
  //   },
  //   {
  //     id: "3",
  //     location: "台中",
  //     places: [
  //       {
  //         camp_name: "合歡山松雪樓露營區",
  //         image: "/main/place/taichung/taichung-1.png",
  //         description: "高山美景，星空絕佳",
  //       },
  //       // {
  //       //   camp_name: "武陵農場露營區",
  //       //   image: "/main/place/taichung/taichung-2.png",
  //       //   description: "四季繽紛，櫻花勝地",
  //       // },
  //       // {
  //       //   camp_name: "鹿角溪露營區",
  //       //   image: "/main/place/taichung/taichung-3.png",
  //       //   description: "溪水潺潺，避暑天堂",
  //       // },
  //     ],
  //   },
  //    {
  //     id: "4",
  //     location: "花蓮",
  //     places: [
  //       {
  //         camp_name: "清境農場露營區",
  //         image: "/main/place/nantou/nantou-1.png",
  //         description: "雲海環繞，絕美仙境",
  //       },
  //       {
  //         camp_name: "福壽山農場露營區",
  //         image: "/main/place/nantou/nantou-2.png",
  //         description: "四季皆美，賞花天堂",
  //       },
  //       // {
  //       //   camp_name: "杉林溪露營區",
  //       //   image: "/main/place/nantou/nantou-3.png",
  //       //   description: "森林秘境，遠離塵囂",
  //       // },
  //     ],
  //   },
  // ];
  return (
    <main className="flex flex-col h-full relative text-neutral-950 text-4xl px-[1rem] sm:px-[8%] 
    py-[40px] md:py-[5%] lg:py-[12%] lg:px-[16%] flex flex-col gap-[1.25rem] lg:gap-[40px] text-center">
      <p className="heading-3 md:hidden">露營活動地點排行</p>
      <p className="heading-1 hidden md:block">露營活動地點排行</p>
      <PlaceEventSlider data={topPlaceEvents}/>
    </main>
  );
}
