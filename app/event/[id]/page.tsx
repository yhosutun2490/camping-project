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
import type { TypeCommentCard } from "@/components/CommentCard";
import sampleComments from "@/fakeData/sampleComments_richer"; // 評論假資料
import type { Metadata } from "next";
// 加入 "full" 狀態
export type RegisterStatus = "incoming" | "registering" | "full" | "passed";
// 動態產生 metadata，根據活動名稱顯示標題
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const eventIdData = await getEventById(id);
  if (!eventIdData) {
    return {
      title: "活動不存在 | 森森不息",
      description: "找不到該活動資訊",
      icons: { icon: "/header/logo_icon.svg" },
    };
  }
  const coverImage =
    eventIdData.photos?.find(
      (photo: { type: string }) => photo.type === "cover"
    )?.photo_url || "/main/main_bg_top_1.jpg";
  return {
    title: `${eventIdData.title} | 森森不息`,
    description: eventIdData.description?.slice(0, 160) || "露營活動詳情",
    openGraph: {
      title: eventIdData.title,
      description: eventIdData.description?.slice(0, 160) || "露營活動詳情",
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: eventIdData.title,
        },
      ],
    },
    icons: { icon: "/header/logo_icon.svg" },
  };
}
// 隨機評論資料
function getRandomComments(arr: TypeCommentCard[], count: number, host_name: string, event_name:string) {
  const shuffled = [...arr]
    .sort(() => 0.5 - Math.random())
    .map(data => ({
      ...data,
      eventInfo: {
        ...data.eventInfo,
        host_name: host_name,
        event_name: event_name
      },
    }));
  return shuffled.slice(0, count).sort((a, b) => new Date(b.comment.date).getTime() - new Date(a.comment.date).getTime());
}

export default async function EventByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. 取得活動id
  const { id } = await params;

  // 2. api 取得單一活動資料
  const eventIdData = await getEventById(id);

  // 報名狀態
  const currentTime = new Date();

  // 判斷是否額滿
  const isOverParticipants =
    eventIdData?.max_participants !== undefined &&
    eventIdData?.bookingCounts !== undefined &&
    eventIdData.bookingCounts >= eventIdData.max_participants;

  // 根據時間與人數決定報名狀態
  const registerStatus: RegisterStatus =
    currentTime < new Date(eventIdData?.registration_open_time ?? "")
      ? "incoming"
      : currentTime > new Date(eventIdData?.registration_close_time ?? "")
      ? "passed"
      : isOverParticipants
      ? "full"
      : "registering";

  // 對應顯示文字
  const registerStatusTextMap: Record<RegisterStatus, string> = {
    incoming: "尚未開始報名",
    registering: "報名中",
    full: "已額滿",
    passed: "已截止報名",
  };

  const bookingStatus = registerStatusTextMap[registerStatus];

  // 3. 渲染活動資料 若無資料導回活動搜尋頁
  if (!eventIdData) {
    redirect("/event");
  }

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
    startTime: eventIdData.start_time,
    endTime: eventIdData.end_time,
    registerStart: eventIdData.registration_open_time,
    registerClose: eventIdData.registration_close_time,
    address: eventIdData.address.slice(0, 3),
    policy: eventIdData.cancel_policy,
    bookingCounts: 0,
    maxParticipants: eventIdData.max_participants,
  };

  // host 主辦方資訊
  const event_host_info = {
    photo_url: eventIdData.host.photo_url,
    name: eventIdData.host.name,
    member_id: eventIdData.host.member_info_id,
    rating: Math.floor(Math.random() * 4) + 3,
    response_count: Math.floor(Math.random() * 50),
    response_rate: Math.floor(Math.random() * 41) + 60,
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

  // 活動評論
  const randomComment = getRandomComments(
    sampleComments,
    Math.ceil(Math.random() * 40),
    eventIdData?.host.name,
    eventIdData?.title
  );

  const commentRating = Math.round(
    randomComment.length > 0
      ? randomComment.reduce(
          (acc, currentItem: TypeCommentCard) =>
            acc + currentItem.comment.rating,
          0
        ) / randomComment.length
      : 0
  );

  // 行前提醒notice
  const event_notices = eventIdData.notices;

  // 購物車用eventDetail
  const shopCartEventDetail = {
    event_info_id: eventIdData.id,
    event_photo_url: eventIdData.photos[0]?.photo_url,
    event_name: eventIdData.title,
  };
  return (
    <div className="relative bg-primary-50 pt-2 md:pt-0 text-black min-h-screen flex flex-col">
      <div
        className="tab-list sticky top-2 z-10 bg-white w-full h-[52px] md:top-0 lg:h-[90px] 
      flex items-center justify-between border-b-2 border-primary-500"
      >
        <TabListAnchor />
      </div>
      <main className="flex-1 px-[5%] md:px-[8%] 2xl:px-[15%] relative bg-primary-50">
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
              <EventBasicInfo
                data={event_basic_info}
                bookingStatus={bookingStatus}
                registerStatus={registerStatus}
              />
              <EventHost host={event_host_info} />
              <EventInfoDescription description={event_description} />
              <EventPlansSection
                event={shopCartEventDetail}
                data={event_plans}
                close_Time={event_register_end}
                registerStatus={registerStatus}
              />
              <EventNewComment
                data={{
                  rating: commentRating,
                  counts: randomComment.length,
                  comment_data: randomComment,
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
                  price={lowestPlan.discounted_price || 0}
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
