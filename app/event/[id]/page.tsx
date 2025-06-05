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

import { getEventById } from "@/api/server-components/event/eventId";
import { redirect } from "next/navigation";

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

export default async function EventByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. 取得活動id
  const { id } = await params;

  // 2. api 取得單一活動資料
  const eventIdData = await getEventById(id);

  // 3. 渲染活動資料 若無資料導回活動搜尋頁
  if (!eventIdData) {
    redirect("/event");
  }
  console.log("單一活動結果", eventIdData);

  // 活動資料區
  const fallbackImages = [
    "/main/main_bg_top_1.jpg",
    "/main/main_bg_top_2.jpg",
    "/main/main_bg_top_3.jpg",
  ];
  // 封面圖
  const coverPhotos =
    eventIdData?.photos
      ?.filter((photo) => photo.type === "cover")
      .map((photo) => photo.photo_url) ?? [];

  const event_cover = [...coverPhotos, ...fallbackImages].slice(0, 3);

  // 最低方案和價格

  const discount_rates = eventIdData.plans
    .map((plan) => {
      const discountRate = plan.discounted_price / plan.price;
      return (discountRate * 100).toFixed(0); // 幾折
    })
    .map(Number)
    .sort((a, b) => a - b);

  // ➤ 找出最低價格方案
  const lowestPlan = eventIdData.plans.reduce((prev, current) => {
    return current.discounted_price < prev.discounted_price ? current : prev;
  });

  // 活動基本資訊
  const event_basic_info = {
    eventName: eventIdData.title,
    startTime: new Date(eventIdData.start_time).toISOString().slice(0, 10),
    endTime: new Date(eventIdData.end_time).toISOString().slice(0, 10),
    address: eventIdData.address.slice(0, 3),
    policy: eventIdData.cancel_policy,
    rating: 0,
    ratingCount: 0,
    commentCount: "",
  };

  // host 主辦方資訊
  const event_host_info = {
    photo_url: eventIdData.host.photo_url,
    name: eventIdData.host.name,
    member_id: eventIdData.host.member_info_id,
    rating: 0,
    response_count: 0,
    response_rate: 0,
  };
  // 活動描述
  const event_description = eventIdData.description;

  // 活動方案和截止報名時間
  const event_register_end = new Date(eventIdData.registration_close_time)
    .toISOString()
    .slice(0, 10);
  const event_plans = eventIdData.plans;

  // 活動詳細圖片和介紹
  const event_detail_photo = eventIdData.photos.find(
    (item) => item.type === "detail"
  );
  const event_detail_introduction = {
    photo_url: event_detail_photo?.photo_url,
    detail: event_detail_photo?.description,
  };

  // 行前提醒notice
  const event_notices = eventIdData.notices;

  return (
    <div className="relative bg-primary-50 pt-2 md:pt-0 text-black min-h-screen flex flex-col">
      <div
        className="tab-list sticky top-0 z-10 bg-white w-full h-[52px] lg:h-[90px] 
      flex items-center justify-between border-b-2 border-primary-500"
      >
        <TabListAnchor />
      </div>
      <main className="flex-1 px-[5%] md:px-[8%] 2xl:px-[15%] relative bg-white">
        <div className="event_main_section min-h-screen md:py-[40px] 2xl:py-[80px] pace-y-6">
          {/* 1. 活動封面照 */}
          <div className="w-full">
            <EventCoverGrid event_images={event_cover} />
          </div>
          <div className="mt-4 min-h-0 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
            {/* 活動主要資訊區塊 */}
            <section id="activity-intro" className="space-y-6 xl:space-y-10">
              {/* 2. 活動價格卡片(手機) */}
              <div className="lg:hidden mb-4">
                <EventPriceCard
                  price={lowestPlan.discounted_price}
                  unit="每人"
                  discounts={discount_rates.map(String)}
                />
              </div>
              <EventBasicInfo data={event_basic_info} />
              <EventHost host={event_host_info} />
              <EventInfoDescription description={event_description} />
              <EventPlansSection
                data={event_plans}
                close_Time={event_register_end}
              />
              <EventNewComment
                data={{
                  rating: 4,
                  counts: 78,
                  comment_data: sampleComment,
                }}
              />
              <EventIntroduction
                photo_url={event_detail_introduction.photo_url ?? ""}
                detail={event_detail_introduction.detail ?? ""}
              />
              <EventNotice notices={event_notices} />
            </section>
            <aside className="relative h-full">
              <div className="hidden lg:block md:sticky md:top-[100px]">
                {/* 2. 活動價格卡片 */}
                <EventPriceCard
                  price={lowestPlan.discounted_price}
                  unit="每人"
                  discounts={discount_rates.map(String)}
                />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
