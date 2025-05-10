// import SearchBarForm from "@/components/SearchBarForm";
import TabList from "./TabList";
import { Icon } from "@iconify/react";
export default function TabListSection() {
  const eventTabLists = [
    {
      title: '全部',
      value: 'all',
      icon: <Icon icon='material-symbols:border-all' className="text-inherit" width={20} height={20} />
    },
    {
      title: '新手友好',
      value: 'beginner',
      icon : <Icon icon='fe:beginner' className="text-inherit" width={20} height={20} />
    },
    {
      title: '家庭親子',
      value: 'family',
      icon: <Icon icon='material-symbols:family-restroom-rounded' className="text-inherit" width={20} height={20} />
    },
    {
      title: '進階挑戰',
      value: 'advance',
      icon: <Icon icon='carbon:skill-level-advanced' className="text-inherit" width={20} height={20} />
    },

  ]
  return (
    <div className="flex flex-col gap-2 bg-inherit pt-4 px-8">
      <p className="search_condition text-2xl text-neutral-950">以下是與台北地區、5人 相關的露營活動體驗 </p>
      <div className="event_search_bar w-[80%] mx-auto">
        {/* <SearchBarForm isBgBlur={false} bgColor="bg-primary-300"/> */}
      </div>
      <TabList lists={eventTabLists}/>
    </div>
  );
}
