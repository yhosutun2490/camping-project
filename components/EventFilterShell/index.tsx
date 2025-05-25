"use client";
import TabList from "@/components/TabListSection/TabList";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import EventCard from "@/components/EventCard";
import EventTagPortalModal from "./EventTagPortalModal";
import PriceRangePortalModal from "./PriceRangePortalModal";
import { useFilterStore } from "@/stores/useFilterStore";
import type { GetEventsParams } from "@/types/api/event/allEvents";
import type { GetApiV1MetaEventTags200DataEventTagsItem } from "@/types/services/EventTags";
import React, { useEffect, useCallback, useState } from "react";
import { useEventList } from "@/swr/events/useEventList";
import InfiniteLoader, {
  InfiniteLoaderChildProps,
} from "react-window-infinite-loader";
import { FixedSizeList, ListChildComponentProps } from "react-window";

type Props = {
  initialFilter: GetEventsParams;
  initialTags: GetApiV1MetaEventTags200DataEventTagsItem[];
};


export default function EventFilterShell({
  initialFilter,
  initialTags,
}: Props) {
  // 篩選store
  const setFilter = useFilterStore((s) => s.setFilter);
  const setTags = useFilterStore((s) => s.setTags);
  // 整體高度
  const [listHeight, setListHeight] = useState(0);

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
    setTags([]);
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
  const { events, totalCount, hasMore, isLoadingMore, loadMore } =
    useEventList(initialFilter);

  // only runs on client
  useEffect(() => {
    const h = window.innerHeight - 200;
    setListHeight(h > 0 ? h : 0);
  }, []);

  // 3. 判斷某筆 index 資料是否已經載入
  const isItemLoaded = useCallback(
    (index: number) => index < events.length,
    [events.length]
  );

  // 4. 當要加載更多時呼叫 loadMore (SWR)
  const loadMoreItems = useCallback(async () => {
    if (hasMore && !isLoadingMore) {
      await loadMore();
    }
  }, [hasMore, isLoadingMore, loadMore]);

  // 5. 定義 list 中每一列該如何 render
  const Row = ({ index, style }: ListChildComponentProps) => {
    if (!isItemLoaded(index)) {
      // 尚未載入的項目顯示 skeleton 或 loading
      return (
        <div style={style} className="p-4 text-center">
          載入中…
        </div>
      );
    }
    const ev = events[index];
    return (
      <div style={style}>
        <EventCard
          key={ev.id}
          title={ev.title}
          price={Number(ev.price)}
          tags={ev.tags}
        />
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-primary-50">
      {/* ——— 頁面頂部：標籤 & Portal 按鈕 ——— */}
      <div className="border-b border-zinc-300 py-2 px-4">
        <div className="hidden md:block">
          <TabList initialTagsList={initialTags} />
        </div>
        <div className="flex justify-between space-x-4 md:hidden">
          <EventTagPortalModal initialTagsList={initialTags} />
          <PriceRangePortalModal />
        </div>
      </div>

      {/* ——— 主體區：左側 Filter + 右側 List ——— */}
      <div className="flex flex-1 min-h-0">
        {/* 左側 Filter（不滚动） */}
        <aside className="hidden md:block w-[300px] py-6 px-4">
          <div className="sticky top-6">
            <PriceRangeFilter />
          </div>
        </aside>

        {/* 右側 列表（虚拟 + 无限滚） */}
        <div className="flex-1 min-h-0 p-6">
          {events.length === 0 && <p className="text-xl text-primary-500 text-center">暫無匹配活動資料</p>}
          {events.length && <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={totalCount}
            loadMoreItems={loadMoreItems}
            threshold={5}
            minimumBatchSize={10}
          >
            {({ onItemsRendered, ref }: InfiniteLoaderChildProps) => (
              <FixedSizeList
                height={listHeight} // 预先用 useEffect 拿到的高度
                width="100%"
                itemCount={totalCount}
                itemSize={380}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Row}
              </FixedSizeList>
            )}
          </InfiniteLoader>}
        </div>
      </div>
    </div>
  );
}
