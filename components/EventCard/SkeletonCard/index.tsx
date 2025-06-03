export default function SkeletonCard() {
  return (
    <div className="card bg-white w-full max-w-full h-full p-8 shadow-sm flex flex-col gap-2 animate-pulse">
      {/* 日期與報名人數 */}
      <div className="date_info flex justify-between items-center">
        <div className="h-4 w-24 bg-neutral-200 rounded" />
        <div className="h-4 w-36 bg-neutral-200 rounded" />
      </div>

      {/* 圖片區塊 */}
      <div className="w-full max-h-[180px] relative aspect-[3/2] overflow-hidden rounded-xl bg-neutral-200" />

      {/* 卡片主體 */}
      <div className="card-body p-0 flex flex-col gap-2 flex-1">
        {/* 標題 */}
        <div className="h-6 w-3/4 bg-neutral-200 rounded" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-neutral-200 rounded-full" />
          <div className="h-6 w-16 bg-neutral-200 rounded-full" />
        </div>

        {/* 價格 */}
        <div className="h-6 w-32 bg-neutral-200 rounded" />

        {/* 按鈕 */}
        <div className="mt-auto h-10 w-full bg-neutral-200 rounded" />
      </div>
    </div>
  );
}