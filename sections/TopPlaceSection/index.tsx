import PlaceEventSlider from "./PlaceEventSlider";
import { getRecommendEvents } from "@/api/server-components/event/recommend"
import type { TopPlace } from "@/sections/TopPlaceSection/PlaceEventSlider"
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

  return (
    <main className="flex flex-col h-full relative text-neutral-950 text-4xl px-[1rem] sm:px-[8%] 
    py-[40px] md:py-[5%] lg:py-[12%] md:px-[10%] 2xl:px-[16%] flex flex-col gap-[1.25rem] lg:gap-[40px] text-center">
      <p className="heading-3 md:hidden">露營活動地點排行</p>
      <p className="heading-1 hidden md:block">露營活動地點排行</p>
      <PlaceEventSlider data={topPlaceEvents} />
    </main>
  );
}
