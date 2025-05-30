"use client";
import TabList from "@/components/TabListSection/TabList";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import EventCard from "@/components/EventCard";
import EventTagPortalModal from "./EventTagPortalModal";
import PriceRangePortalModal from "./PriceRangePortalModal";
import { useFilterStore } from "@/stores/useFilterStore";
import type { GetEventsParams } from "@/types/api/event/allEvents";
import type { GetApiV1MetaEventTags200DataEventTagsItem } from "@/types/services/EventTags";
import React, { useEffect, useCallback, useState, useMemo } from "react";
import { useEventList } from "@/swr/events/useEventList";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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

  // 活動列表grid rows行數
  const itemsPerRow = useItemsPerRow();

  useEffect(() => {
    // 1. 初始化除了 tags 以外的欄位
    setFilter({
      location: initialFilter.location,
      people: initialFilter.people,
      minPrice: initialFilter.minPrice,
      maxPrice: initialFilter.maxPrice,
      start_Time: initialFilter.startTime,
      end_Time: initialFilter.endTime,
    });
  }, [
    initialFilter.location,
    initialFilter.people,
    initialFilter.minPrice,
    initialFilter.maxPrice,
    initialFilter.startTime,
    initialFilter.endTime,
    setFilter,
    setTags,
  ]);

  // 無限載入實作
  // 1. 從 hook 拿資料、總筆數、分頁控制方法
  const { events, hasMore, isLoadingMore, loadMore } =
    useEventList(initialFilter);

  const filteredEvents = useMemo(() => {
    if (!tags || tags.length === 0) return events;

    return events.filter((event) =>
      event.tags?.some((tag) => tags.includes(tag))
    );
  }, [events, tags]);

  // 3. 判斷某筆 index 資料是否已經載入
  const isItemLoaded = useCallback(
    (index: number) => index < Math.ceil(filteredEvents.length / itemsPerRow),
    [filteredEvents.length, itemsPerRow]
  );

  // 4. 當要加載更多時呼叫 loadMore (SWR)
  const loadMoreItems = useCallback(async () => {
    if (hasMore && !isLoadingMore) {
      await loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  // 5. 定義 list 中每一列該如何 render
  const Row = ({ index, style }: ListChildComponentProps) => {
    const startIndex = index * itemsPerRow;
    const rowItems = filteredEvents.slice(startIndex, startIndex + itemsPerRow);

    if (rowItems.length === 0) {
      return (
        <div style={style} className="p-4 text-center">
          載入中…
        </div>
      );
    }

    return (
      <div
        style={style}
        className="grid grid-cols-1 justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 px-4"
      >
        {rowItems.map((item) => (
          <div className="min-w-[300px] max-w-[500px] mx-auto" key={item.id}>
            <EventCard
              title={item.title}
              date={{ start: item.start_time, end: item.end_time }}
              price={item.price}
              tags={item.tags}
            />
          </div>
        ))}
      </div>
    );
  };

  const rowCount = Math.ceil(filteredEvents.length / itemsPerRow);

  return (
    <div className="h-screen flex flex-col bg-primary-50">
      {/* ——— 頁面頂部：標籤 & Portal 按鈕 ——— */}
      <div className="border-b border-zinc-300 py-2 px-4">
        <div className="hidden md:block">
          <TabList initialTagsList={initialEventTags} />
        </div>
        <div className="flex justify-between space-x-4 md:hidden">
          <EventTagPortalModal initialTagsList={initialEventTags} />
          <PriceRangePortalModal />
        </div>
      </div>

      {/* ——— 主體區：左側 Filter + 右側 List ——— */}
      <div className="flex flex-1 min-h-0">
        {/* 左側 Filter */}
        <aside className="hidden md:block w-[300px] py-6 px-4">
          <div className="sticky top-6">
            <PriceRangeFilter />
          </div>
        </aside>

        {/* 右側列表 */}
        <div className="flex-1 min-h-screen p-6">
          {filteredEvents.length === 0 && (
            <p className="text-xl text-primary-500 text-center">
              暫無匹配活動資料
            </p>
          )}
          {filteredEvents.length && (
            <div className="flex-1 min-h-0 h-full">
              <AutoSizer>
                {({ height, width }) => (
                  <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={rowCount}
                    loadMoreItems={loadMoreItems}
                    threshold={5}
                    minimumBatchSize={10}
                  >
                    {({ onItemsRendered, ref }) => (
                      <FixedSizeList
                        height={height}
                        width={width}
                        itemCount={rowCount}
                        itemSize={450}
                        onItemsRendered={onItemsRendered}
                        outerRef={ref}
                      >
                        {Row}
                      </FixedSizeList>
                    )}
                  </InfiniteLoader>
                )}
              </AutoSizer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
