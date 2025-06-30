import RecommendSlider from "./RecommendSlider";
import { getRecommendEvents } from "@/api/server-components/event/recommend"
export default async function BestActivitySection() {
  const recommendEvents = await getRecommendEvents()
  return (
    <main
      className="flex flex-col h-full relative text-neutral-950 text-4xl px-[8%] py-[40px] md:py-[5%] 
    lg:py-[12%] 2xl:px-[16%] flex flex-col gap-[1.5rem] lg:gap-[40px] text-center"
    >
      <p className="heading-3 md:hidden"> 超人氣精選活動</p>
      <p className="heading-1 hidden md:block"> 超人氣精選活動</p>
      <RecommendSlider data={recommendEvents?.popularEvents ?? []} />
    </main>
  );
}
