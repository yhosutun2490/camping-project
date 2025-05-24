"use client";
import TabList from "@/components/TabListSection/TabList";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import EventCard from "@/components/EventCard";
import EventTagPortalModal from "./EventTagPortalModal";
import PriceRangePortalModal from "./PriceRangePortalModal";
import { useFilterStore } from '@/stores/useFilterStore'
import type { GetEventsParams } from '@/types/api/event/allEvents'
import type { GetApiV1MetaEventTags200Data} from '@/types/services/EventTags'
import { useEffect } from "react";

type Props = {
  initialFilter: GetEventsParams,
  initialTags: GetApiV1MetaEventTags200Data 
}


export default function EventFilterShell({initialFilter, initialTags}:Props) {
  const setFilter = useFilterStore((s) => s.setFilter)
  const setTags   = useFilterStore((s) => s.setTags)

  useEffect(() => {
    // 1. 初始化除了 tags 以外的欄位
    setFilter({
      location:  initialFilter.location,
      people:    initialFilter.people,
      minPrice:  initialFilter.minPrice,
      maxPrice:  initialFilter.maxPrice,
      start_Time: initialFilter.startTime,
      end_Time:   initialFilter.endTime,
    })
    setTags([])
  }, [
    initialFilter.location,
    initialFilter.people,
    initialFilter.minPrice,
    initialFilter.maxPrice,
    initialFilter.startTime,
    initialFilter.endTime,
    setFilter,
    setTags,
  ])

  return (
    <div className="event_filter_section">
      <div className="border-b-1 border-zinc-300 py-2 px-4">
        <div className="hidden md:block">
          <TabList initialTagsList={initialTags}/>
        </div>
        <div className="flex justify-between space-x-4 md:hidden">
          <EventTagPortalModal initialTagsList={initialTags} />
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
