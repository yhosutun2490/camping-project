"use client";
import TabList from "@/components/TabListSection/TabList";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import EventCard from "@/components/EventCard";
import EventTagPortalModal from "./EventTagPortalModal";
import PriceRangePortalModal from "./PriceRangePortalModal";
import { useFilterStore } from "@/stores/useFilterStore";
import type { GetEventsParams } from "@/types/api/event/allEvents";
import type { GetApiV1MetaEventTags200DataEventTagsItem } from "@/types/services/EventTags";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useEventList } from "@/swr/events/useEventList";
// import InfiniteLoader from "react-window-infinite-loader";
// import { FixedSizeList, ListChildComponentProps } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
import SkeletonCard from "../EventCard/SkeletonCard";

type Props = {
  initialFilter: GetEventsParams;
  initialEventTags: GetApiV1MetaEventTags200DataEventTagsItem[];
};

function useItemsPerRow() {
  const [itemsPerRow, setItemsPerRow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerRow(1);
      } else if (width < 1248) {
        setItemsPerRow(2);
      } else {
        setItemsPerRow(3);
      }
    };

    handleResize(); // 初次執行
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerRow;
}

export default function EventFilterShell({
  initialFilter,
  initialEventTags,
}: Props) {
  // 篩選store
  const setFilter = useFilterStore((s) => s.setFilter);
  const setTags = useFilterStore((s) => s.setTags);
  const tags = useFilterStore((s) => s.tags); // 這裡是 store 的 tags 陣列
  // 1. 從 hook 拿資料、總筆數、分頁控制方法
  const { events, hasMore, isLoading, isLoadingMore, loadMore } =
    useEventList(initialFilter);

  const filteredEvents = useMemo(() => {
    if (!tags || tags.length === 0) return events;

    return events.filter((event) =>
      event.tags?.some((tag) => tags.includes(tag))
    );
  }, [events, tags]);

  // 活動列表grid rows行數
  // const itemsPerRow = useItemsPerRow();

  useEffect(() => {
    // 1. 初始化除了 tags 以外的欄位
    setFilter({
      location: initialFilter.location,
      people: initialFilter.people,
      minPrice: initialFilter.minPrice,
      maxPrice: initialFilter.maxPrice,
      start_Time: initialFilter.start_time,
      end_Time: initialFilter.end_time,
    });
  }, [
    initialFilter.location,
    initialFilter.people,
    initialFilter.minPrice,
    initialFilter.maxPrice,
    initialFilter.start_time,
    initialFilter.end_time,
    setFilter,
    setTags,
  ]);
  // 單純用observer 監控拉取新的活動資料
  /* ---------- Intersection Observer sentinel ---------- */
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { rootMargin: "200px" }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [loadMore]);

  /* ---------- 排版 ---------- */
  const itemsPerRow = useItemsPerRow();

  // 無限載入實作

  // 3. 判斷某筆 index 資料是否已經載入
  // const isItemLoaded = useCallback(
  //   (index: number) => index < Math.ceil(filteredEvents.length / itemsPerRow),
  //   [filteredEvents.length, itemsPerRow]
  // );

  // 4. 當要加載更多時呼叫 loadMore (SWR)
  // const loadMoreItems = useCallback(async () => {
  //   if (hasMore && !isLoadingMore) {
  //     await loadMore();
  //   }
  // }, [hasMore, isLoadingMore, loadMore]);

  // 5. 定義 list 中每一列該如何 render
  // const Row = ({ index, style }: ListChildComponentProps) => {
  //   const startIndex = index * itemsPerRow;
  //   const rowItems = filteredEvents.slice(startIndex, startIndex + itemsPerRow);

  //   if (rowItems.length === 0) {
  //     return (
  //       <div style={style} className="p-4 text-center">
  //         載入中…
  //       </div>
  //     );
  //   }
  //   return (
  //     <div
  //       style={style}
  //       className="grid grid-cols-1 justify-center md:grid-cols-2 xl:grid-cols-3 gap-10 px-4"
  //     >
  //       {rowItems.map((item) => (
  //         <div
  //           className="w-[85%] mb-5 sm:w-[450px] max-h-[400px] md:w-full mx-auto"
  //           key={item.id}
  //         >
  //           <EventCard
  //             id={item.id}
  //             title={item.title}
  //             date={{ start: item.start_time, end: item.end_time }}
  //             price={
  //               item.plans && item.plans.length > 0
  //                 ? String(Math.min(...item.plans.map((plan) => plan.price)))
  //                 : undefined
  //             }
  //             tags={item.tags}
  //             image={item.photos || []}
  //             address={item.address.slice(0, 3)}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  // const rowCount = Math.ceil(filteredEvents.length / itemsPerRow);

  return (
    <div className="min-h-screen flex flex-col bg-primary-50">
      {/* ——— 頁面頂部：標籤 & Portal 按鈕 ——— */}
      <div className="border-b border-zinc-300 py-4 px-4">
        <div className="hidden lg:block">
          <TabList initialTagsList={initialEventTags} />
        </div>
        <div className="flex justify-between space-x-4 lg:hidden">
          <EventTagPortalModal initialTagsList={initialEventTags} />
          <PriceRangePortalModal />
        </div>
      </div>

      {/* ——— 主體區：左側 Filter + 右側 List ——— */}
      <div className="flex flex-1 min-h-0">
        {/* 左側 Filter */}
        <aside className="hidden lg:block w-[300px] h-full py-6 px-4">
          <div className="sticky top-6">
            <PriceRangeFilter />
          </div>
        </aside>

        {/* 右側列表 */}
        {/*Loading -> No Data -> Actual Data */}
        <div className="flex-1 min-h-screen py-6 md:p-6 bg-primary-50">
          {isLoading ? (
            <div className="grid grid-cols-1 justify-center lg:grid-cols-2 xl:grid-cols-3 gap-10 px-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <p className="text-xl text-primary-500 text-center">
              暫無匹配活動資料
            </p>
          ) : (
            // <div className="flex-1 min-h-0 h-full">
            //   <AutoSizer>
            //     {({ height, width }) => (
            //       <InfiniteLoader
            //         isItemLoaded={isItemLoaded}
            //         itemCount={rowCount}
            //         loadMoreItems={loadMoreItems}
            //         threshold={5}
            //         minimumBatchSize={10}
            //       >
            //         {({ onItemsRendered, ref }) => (
            //           <FixedSizeList
            //             height={height}
            //             width={width}
            //             itemCount={rowCount}
            //             itemSize={450}
            //             onItemsRendered={onItemsRendered}
            //             outerRef={ref}
            //           >
            //             {Row}
            //           </FixedSizeList>
            //         )}
            //       </InfiniteLoader>
            //     )}
            //   </AutoSizer>
            // </div>
            <>
              <div
                className={`grid gap-10 px-4 ${
                  itemsPerRow === 1
                    ? "grid-cols-1"
                    : itemsPerRow === 2
                    ? "md:grid-cols-2"
                    : "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                }`}
              >
                {filteredEvents.map((item) => (
                  <div
                    key={item.id}
                    className="w-[85%] mb-5 sm:w-[450px] md:w-full mx-auto"
                  >
                    <EventCard
                      id={item.id}
                      title={item.title}
                      date={{ start: item.start_time, end: item.end_time }}
                      price={
                        item.plans?.length
                          ? String(Math.min(...item.plans.map((p) => p.price)))
                          : undefined
                      }
                      tags={item.tags}
                      image={item.photos || []}
                      address={item.address.slice(0, 3)}
                    />
                  </div>
                ))}
              </div>

              {/* sentinel：觸發載入下一頁 */}
              {hasMore && <div ref={sentinelRef} className="h-4 w-full my-4" />}

              {/* 載入更多 loading 動畫 */}
              {isLoadingMore && (
                <div className="grid grid-cols-1 justify-center lg:grid-cols-2 xl:grid-cols-3 gap-10 px-4">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <SkeletonCard key={idx} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
