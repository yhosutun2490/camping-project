"use client";
import TabList from "@/components/TabListSection/TabList";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import EventCard from "@/components/EventCard";
import EventTagPortalModal from "./EventTagPortalModal";
import PriceRangePortalModal from "./PriceRangePortalModal";


export default function EventFilterShell() {
  return (
    <div className="event_filter_section">
      <div className="border-b-1 border-zinc-300 py-2 px-4">
        <div className="hidden md:block">
          <TabList />
        </div>
        <div className="flex justify-between space-x-4 md:hidden">
          <EventTagPortalModal />
          <PriceRangePortalModal />
        </div>
      </div>
      <div className="flex flex-grow">
        {/* 左邊 Filter（不會滾） */}
        <aside className="hidden md:block w-[300px] py-6 px-4">
          <div className="sticky top-6 h-fit">
            <PriceRangeFilter />
          </div>
        </aside>

        {/* 右邊卡片區（⚠️ scroll 主體） */}
        <div
          className="flex-1 pt-6 pb-[120px] grid justify-center
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
