import SearchBarForm from "@/components/SearchBarForm";
export default function TabListSection() {
  return (
    <div className="tabs tabs-box flex flex-col gap-5 bg-inherit border-2 py-6 px-8">
      <p className="search_condition text-4xl text-neutral-950">以下是與台北地區、5人 相關的露營活動體驗 </p>
      <div className="event_search_bar w-[80%] mx-auto">
        <SearchBarForm isBgBlur={false} bgColor="bg-primary-300"/>
      </div>
    </div>
  );
}
