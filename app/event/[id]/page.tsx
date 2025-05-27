import TabListAnchor from "@/components/EventById/TabListAnchor";
export default async function EventByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. 取得活動id
  const { id } = await params;

  // 2. api 取得單一活動資料
  // const event = await getEventById(id);

  // 3. 渲染活動資料 若無資料導回活動搜尋頁
  return (
    <div className="bg-primary-50 text-black">
      <div className="sticky top-0 h-[50px] md:h-[40px]">
        <TabListAnchor />
      </div>
      <main className="event_info min-h-screen">
        <p>活動 ID: {id} </p>
        <section id="activity-intro">
          <h2>活動介紹</h2>
          <p className="h-[1500px]">內容內容內容</p>
        </section>
      </main>
    </div>
  );
}
