"use client";
import TabList from "@/components/TabListSection/TabList";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import EventCard from "@/components/EventCard";
import EventTagPortalModal from "./EventTagPortalModal";
import PriceRangePortalModal from "./PriceRangePortalModal";
import { useFilterStore } from '@/stores/useFilterStore'
import type { GetEventsParams } from '@/types/api/event/allEvents'
import type { GetApiV1MetaEventTags200Data} from '@/types/services/EventTags'
import type {  Event } from '@/types/api/event/allEvents';
import { useEffect } from "react";
import { useEventList } from "@/swr/event/useEventList"

type Props = {
  initialFilter: GetEventsParams,
  initialTags: GetApiV1MetaEventTags200Data 
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "森林漫步露營體驗",
    start_time: "2025-06-01T14:00:00+08:00",
    end_time:   "2025-06-01T18:00:00+08:00",
    address: "花蓮縣太魯閣國家公園",
    price: "1200",
    photos: [
      "/images/event1-1.jpg",
      "/images/event1-2.jpg"
    ],
    tags: ["新手友善", "秘境探索"]
  },
  {
    id: "2",
    title: "夜間星空觀測露營",
    start_time: "2025-06-05T19:00:00+08:00",
    end_time:   "2025-06-06T07:00:00+08:00",
    address: "南投縣清境農場",
    price: "2000",
    photos: [
      "/images/event2-1.jpg",
      "/images/event2-2.jpg"
    ],
    tags: ["進階挑戰", "秘境探索"]
  },
  {
    id: "3",
    title: "親子森林尋寶露營",
    start_time: "2025-06-10T10:00:00+08:00",
    end_time:   "2025-06-11T12:00:00+08:00",
    address: "新北市烏來風景區",
    price: "1800",
    photos: [
      "/images/event3-1.jpg",
      "/images/event3-2.jpg"
    ],
    tags: ["闔家同樂", "新手友善"]
  },
  {
    id: "4",
    title: "豪華帳篷 glamping",
    start_time: "2025-06-15T15:00:00+08:00",
    end_time:   "2025-06-16T11:00:00+08:00",
    address: "台東縣太麻里海灘",
    price: "5000",
    photos: [
      "/images/event4-1.jpg",
      "/images/event4-2.jpg"
    ],
    tags: ["奢華露營"]
  },
  {
    id: "5",
    title: "山林瑜伽深度露營",
    start_time: "2025-06-20T08:00:00+08:00",
    end_time:   "2025-06-21T17:00:00+08:00",
    address: "南投縣合歡山",
    price: "2500",
    photos: [
      "/images/event5-1.jpg",
      "/images/event5-2.jpg"
    ],
    tags: ["新手友善", "秘境探索"]
  },
  {
    id: "6",
    title: "單車環湖露營之旅",
    start_time: "2025-06-25T09:00:00+08:00",
    end_time:   "2025-06-26T18:00:00+08:00",
    address: "花蓮縣鯉魚潭",
    price: "2200",
    photos: [
      "/images/event6-1.jpg",
      "/images/event6-2.jpg"
    ],
    tags: ["闔家同樂", "進階挑戰"]
  },
  {
    id: "7",
    title: "深山野溪溯溪露營",
    start_time: "2025-07-01T08:00:00+08:00",
    end_time:   "2025-07-02T16:00:00+08:00",
    address: "南投縣信義鄉",
    price: "2800",
    photos: [
      "/images/event7-1.jpg",
      "/images/event7-2.jpg"
    ],
    tags: ["進階挑戰"]
  },
  {
    id: "8",
    title: "潮間帶生態探索露營",
    start_time: "2025-07-05T14:00:00+08:00",
    end_time:   "2025-07-06T10:00:00+08:00",
    address: "屏東縣東港",
    price: "1600",
    photos: [
      "/images/event8-1.jpg",
      "/images/event8-2.jpg"
    ],
    tags: ["秘境探索"]
  },
  {
    id: "9",
    title: "森林音樂會露營派對",
    start_time: "2025-07-10T17:00:00+08:00",
    end_time:   "2025-07-11T09:00:00+08:00",
    address: "宜蘭縣武荖坑風景區",
    price: "3000",
    photos: [
      "/images/event9-1.jpg",
      "/images/event9-2.jpg"
    ],
    tags: ["進階挑戰", "奢華露營"]
  },
  {
    id: "10",
    title: "黑森林祕境極限挑戰",
    start_time: "2025-07-15T06:00:00+08:00",
    end_time:   "2025-07-16T18:00:00+08:00",
    address: "嘉義縣梅山鄉",
    price: "3200",
    photos: [
      "/images/event10-1.jpg",
      "/images/event10-2.jpg"
    ],
    tags: ["進階挑戰"]
  },
  {
    id: "11",
    title: "星空下的露天電影院",
    start_time: "2025-07-20T19:00:00+08:00",
    end_time:   "2025-07-21T23:00:00+08:00",
    address: "桃園市復興區",
    price: "1400",
    photos: [
      "/images/event11-1.jpg",
      "/images/event11-2.jpg"
    ],
    tags: ["新手友善"]
  },
  {
    id: "12",
    title: "高山原住民文化體驗",
    start_time: "2025-07-25T10:00:00+08:00",
    end_time:   "2025-07-26T15:00:00+08:00",
    address: "花蓮縣卓溪鄉",
    price: "2600",
    photos: [
      "/images/event12-1.jpg",
      "/images/event12-2.jpg"
    ],
    tags: ["秘境探索", "闔家同樂"]
  },
  {
    id: "13",
    title: "黃金海岸瑜伽露營",
    start_time: "2025-07-30T07:00:00+08:00",
    end_time:   "2025-07-31T11:00:00+08:00",
    address: "台東縣成功鎮",
    price: "2700",
    photos: [
      "/images/event13-1.jpg",
      "/images/event13-2.jpg"
    ],
    tags: ["奢華露營", "新手友善"]
  },
  {
    id: "14",
    title: "溫泉山林露營",
    start_time: "2025-08-01T12:00:00+08:00",
    end_time:   "2025-08-02T12:00:00+08:00",
    address: "台中市谷關",
    price: "2300",
    photos: [
      "/images/event14-1.jpg",
      "/images/event14-2.jpg"
    ],
    tags: ["闔家同樂"]
  },
  {
    id: "15",
    title: "深夜瘋狂篝火派對",
    start_time: "2025-08-05T21:00:00+08:00",
    end_time:   "2025-08-06T02:00:00+08:00",
    address: "屏東縣恆春半島",
    price: "1900",
    photos: [
      "/images/event15-1.jpg",
      "/images/event15-2.jpg"
    ],
    tags: ["進階挑戰", "奢華露營"]
  },
  {
    id: "16",
    title: "竹林禪修靜心營",
    start_time: "2025-08-10T09:00:00+08:00",
    end_time:   "2025-08-11T18:00:00+08:00",
    address: "南投縣竹山鎮",
    price: "2100",
    photos: [
      "/images/event16-1.jpg",
      "/images/event16-2.jpg"
    ],
    tags: ["新手友善"]
  },
  {
    id: "17",
    title: "沙漠星空露營（模擬）",
    start_time: "2025-08-15T18:00:00+08:00",
    end_time:   "2025-08-16T08:00:00+08:00",
    address: "台北市大安森林公園",
    price: "1500",
    photos: [
      "/images/event17-1.jpg",
      "/images/event17-2.jpg"
    ],
    tags: ["秘境探索"]
  },
  {
    id: "18",
    title: "高空繩索冒險營",
    start_time: "2025-08-20T08:00:00+08:00",
    end_time:   "2025-08-21T17:00:00+08:00",
    address: "新竹縣五峰鄉",
    price: "2900",
    photos: [
      "/images/event18-1.jpg",
      "/images/event18-2.jpg"
    ],
    tags: ["進階挑戰"]
  },
  {
    id: "19",
    title: "森林野炊料理班",
    start_time: "2025-08-25T10:00:00+08:00",
    end_time:   "2025-08-26T14:00:00+08:00",
    address: "桃園市大溪區",
    price: "1700",
    photos: [
      "/images/event19-1.jpg",
      "/images/event19-2.jpg"
    ],
    tags: ["闔家同樂"]
  },
  {
    id: "20",
    title: "湖畔靜謐露營",
    start_time: "2025-08-30T16:00:00+08:00",
    end_time:   "2025-08-31T10:00:00+08:00",
    address: "苗栗縣三義鄉",
    price: "2400",
    photos: [
      "/images/event20-1.jpg",
      "/images/event20-2.jpg"
    ],
    tags: ["新手友善", "秘境探索"]
  }
];

export default function EventFilterShell({initialFilter, initialTags}:Props) {
  // swr get event list
  const { events } = useEventList(initialFilter)

  // 篩選store
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
          {events.length? events.map((data)=>{
            return (
           <EventCard 
              key={data.title} 
              title={data.title}
              price={Number(data.price)}
              tags={data.tags}
            ></EventCard>)
          }): mockEvents.map(data=>{
            return <EventCard   
              key={data.title} 
              title={data.title}
              price={Number(data.price)}
              tags={data.tags}
              ></EventCard>
          })}
        </div>
      </div>
    </div>
  );
}
