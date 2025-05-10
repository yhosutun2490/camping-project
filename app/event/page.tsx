import TabListSection from "@/components/TabListSection";
import EventCard from "@/components/EventCard";
import PriceRangeFilter from "@/components/PriceRangeFilter";
export default function EventPage() {
  return (
    <div className="h-screen bg-primary-50 ">
      {/* Header */}
      <div className="flex-shrink-0 border-b-2 border-stone-200">
        <TabListSection />
      </div>

      {/* 主體左右區塊 */}
      <div className="flex flex-grow">
        {/* 左邊 Filter（不會滾） */}
        <aside className="w-[300px] p-6">
          <div className="sticky top-6 h-fit">
            <PriceRangeFilter />
          </div>
        </aside>

        {/* 右邊卡片區（⚠️ scroll 主體） */}
        <div
          className="flex-1 p-6 grid
          grid-cols-[repeat(auto-fit,minmax(250px,350px))] grid-rows-max gap-4"
        >
          <EventCard />
          <EventCard image="/event/event_2.png" />
          <EventCard image="/event/event_3.png" />
          <EventCard image="/event/event_1.png" />
        </div>
      </div>
    </div>
  );
}
