import TabListAnchor from "@/components/EventById/TabListAnchor";
import EventCoverGrid from "@/components/EventById/EventCoverGrid";
import EventBasicInfo from "@/components/EventById/EventBasicInfo";
import EventPriceCard from "@/components/EventById/EventPriceCard";
import EventPlansSection from "@/components/EventById/EventPlansSection";
export default async function EventByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. 取得活動id
  const { id } = await params;
  console.log("活動ID:", id);

  // 2. api 取得單一活動資料
  // const event = await getEventById(id);

  // 3. 渲染活動資料 若無資料導回活動搜尋頁
  return (
    <div className="bg-primary-50 text-black min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-white w-full h-[50px] flex items-center justify-between px-4 shadow">
        <TabListAnchor />
      </div>
      <main className="h-[calc(100dvh-120px)] overflow-y-auto px-6 py-4">
        {/* 1. 活動封面照 */}
        <div className="w-full h-[400px]">
          <EventCoverGrid />
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-4">
          {/* 活動主要資訊區塊 */}
          <main>
            <section id="activity-intro">
              {/* 2. 活動價格卡片(手機) */}
              <div className="lg:hidden mb-4">
                <EventPriceCard
                  price={1000}
                  unit="每人"
                  discounts={["早鳥優惠", "團體優惠"]}
                />
              </div>

              <EventBasicInfo />
              <EventPlansSection />
            </section>
          </main>
          <aside className="relative h-screen">
            <div className="hidden lg:block md:sticky md:top-0">
              {/* 2. 活動價格卡片 */}
              <EventPriceCard
                price={1000}
                unit="每人"
                discounts={["早鳥優惠", "團體優惠"]}
              />
            </div>
          </aside>

          <p className="h-[1500px]">內容內容內容</p>
        </div>
      </main>
    </div>
  );
}
