import TabListAnchor from "@/components/EventById/TabListAnchor";
import EventCoverGrid from "@/components/EventById/EventCoverGrid";
import EventBasicInfo from "@/components/EventById/EventBasicInfo";
import EventHost from "@/components/EventById/EventHost";
import EventInfoDescription from "@/components/EventById/EventBasicInfo/EventInfoDescription";
import EventPriceCard from "@/components/EventById/EventPriceCard";
import EventPlansSection from "@/components/EventById/EventPlansSection";
import EventNewComment from "@/components/EventById/EventNewComment";
import EventIntroduction from "@/components/EventById/EventIntroduction";
import EventNotice from "@/components/EventById/EventNotice";

// 假資料
const sampleComment = [
  {
    userInfo: {
      user_id: "u001",
      name: "陳明輝",
      image: "/header/user_image.jpg",
    },
    eventInfo: {
      event_id: "e101",
      event_name: "松林谷地露營區",
      host_id: "h1001",
      host_name: "蔚然海岸",
    },
    comment: {
      id: "c0001",
      description:
        "環境非常優美，樹木扶疏提供良好的遮蔭。營地平整且寬敞，方便帳篷搭建。廁所及淋浴設施乾淨整潔，管理人員服務態度親切。夜晚可以清楚看到滿天星斗，早晨還有機會看到壯麗的日出。絕對會再次造訪！",
      date: "2025-01-01",
      rating: 5,
    },
  },
  {
    userInfo: {
      user_id: "u002",
      name: "林佳穎",
      image: "/header/user_image.jpg",
    },
    eventInfo: {
      event_id: "e102",
      event_name: "藍海灣露營地",
      host_id: "h1002",
      host_name: "嘎嘎作響",
    },
    comment: {
      id: "c0002",
      description:
        "位置靠近海邊最好的，但風稍強平是白天的（防曬）。有防風牆和樹遮擋視野的山。廚房設施完善，有提供基本調味料。夜晚可以聽到海浪聲，非常放鬆。少了一顆星是因為衛浴設施數量不足，尖峰時段需要排隊",
      date: "2025-05-05",
      rating: 4,
    },
  },
];

const notices = [
  {
    id: "f4d1642d-a800-4acb-8b36-6963d001ecff",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content: "請攜帶防蚊液與防曬乳，以應對夏季戶外活動中的蚊蟲與陽光曝曬。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "529fc98e-e4a7-4219-a033-78da97e7cda5",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content: "集合地點：台北車站東三門，請準時集合以便順利出發。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "2997d5ef-4fac-4855-9a96-4e8b689f30e5",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content:
      "此活動為親子家庭專屬，請準備適合孩童的服裝與泳具，並攜帶必要的兒童用品。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "470cef9e-8b03-4716-89cc-43590b6df308",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content:
      "營地設有溪邊活動區，適合水上遊戲與親子互動，請準備防水鞋與換洗衣物。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "ade7ee43-a947-4307-9c8a-7a55765a4af8",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content:
      "夜晚營火晚會時，請準備適合戶外寒冷氣候的衣物，避免夜間低溫影響舒適度。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "3fa78ead-80c6-4be7-acc3-252105329378",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content:
      "活動期間將安排徒步探險，建議穿著舒適的運動鞋，並攜帶足夠水源與防曬用品。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "be663ba8-21a9-4a5b-99ea-248ef14d2225",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content:
      "提醒各位家長與孩童，在溪邊活動時務必注意安全，請隨時留意孩子們的行為並協助其安全渡過。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
  {
    id: "fbef7791-6692-4da7-83f8-d39f517c7abf",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    type: "行前提醒",
    content: "集合與散場時，請遵守活動指引，並確保垃圾帶回，不留任何環境痕跡。",
    created_at: "2025-05-06T06:05:49.058Z",
    updated_at: "2025-05-06T06:05:49.058Z",
  },
];
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
    <div className="relative bg-primary-50 pt-2 md:pt-0 text-black min-h-screen flex flex-col">
      <div
        className="tab-list sticky top-0 z-10 bg-white w-full h-[52px] lg:h-[90px] 
      flex items-center justify-between border-b-2 border-primary-500"
      >
        <TabListAnchor />
      </div>
      <main
        id="main-scroll-container"
        className="flex-1 px-[5%] md:px-[8%] 2xl:px-[15%] relative"
      >
        <div className="event_main_section min-h-screen pt-[40px] 2xl:pt-[80px] space-y-6">
          {/* 1. 活動封面照 */}
          <div className="w-full h-[200px] md:h-[400px] 2xl:h-[636px]">
            <EventCoverGrid />
          </div>
          <div className="mt-4 min-h-0 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10">
            {/* 活動主要資訊區塊 */}
            <section id="activity-intro" className="space-y-6 xl:space-y-10">
              {/* 2. 活動價格卡片(手機) */}
              <div className="lg:hidden mb-4">
                <EventPriceCard
                  price={1000}
                  unit="每人"
                  discounts={["69", "79"]}
                />
              </div>
              <EventBasicInfo />
              <EventHost />
              <EventInfoDescription />
              <EventPlansSection />
              <EventNewComment
                data={{
                  rating: 4,
                  counts: 78,
                  comment_data: sampleComment,
                }}
              />
              <EventIntroduction
                detail={`創造一個戶外空間，讓大家可以親身體會到花蓮豐濱的美，
              並且帶領大家一同了解阿美族的故事，我們有的很簡單，有山、有海、有草地、有星空、有陽光，
              有原住民帥哥營主兄弟黨跟你聊天，還很多小米酒，來到這裡！記得放下手機、放下煩憂、放下工作、好好享受，花蓮豐濱海放生活`}
              />
              <EventNotice
                notices={notices}
              />
            </section>
            <aside className="relative h-full">
              <div className="hidden md:block md:sticky md:top-[100px]">
                {/* 2. 活動價格卡片 */}
                <EventPriceCard
                  price={1000}
                  unit="每人"
                  discounts={["69", "79"]}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
