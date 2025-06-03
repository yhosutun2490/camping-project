"use client";
import EventPlanSelector from "@/components/EventById/EventPlanSelector";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EventPlan } from "@/schema/EventPlanForm";
import { eventPlanSchema } from "@/schema/EventPlanForm";
// UI props type
import { PlanData } from "@/components/EventById/EventPlanSelector/EventPlanCard";
import { z } from "zod";

type FormType = z.infer<typeof eventPlanSchema>;
const mockPlans: EventPlan[] = [
  {
    id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    title: "【五人帳區 SKYDOME 豪華野營組】雙層透氣帳篷（最多5人含孩童）",
    price: 3000,
    discounted_price: 2069,
    people_capacity: 0,
    created_at: "2025-05-06T06:02:24.511Z",
    updated_at: "2025-05-06T06:02:24.511Z",
    eventPlanContentBox: [
      {
        id: "fdb826b7-c8f3-453e-9057-4da036058ee8",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        content: "一泊二食：含早餐與專業 BBQ 晚餐（台灣在地食材）",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "2578d762-8f72-4ef0-a538-ff9d430a2590",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        content:
          "專人搭設 SKYDOME 雙層透氣帳，帳內附設地墊、LED 燈條、野營桌椅",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "44ff239c-2bab-4c7c-a8a2-2a54c292c680",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        content: "獨立營位區塊，鄰近溪流與木棧道，享受私密山林空間",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "fac0d7fe-b1ac-4eaa-b32c-b58db74b5d43",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        content: "帳篷大小彈性配置，可依家庭人數與活動性質調整",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "1777b241-98ca-411d-bf2b-c0f9886f5f21",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        content: "專屬防蚊區與遮陰天幕，營位全天候保持舒適",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
    ],
    eventPlanAddonBox: [
      {
        id: "a1565608-30c3-4b49-898e-c042e29d3838",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        name: "戶外懶人沙發 x2",
        price: 300,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "986a83d7-75e2-4a65-bf27-e5df2c9ce5d9",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        name: "LED 露營燈組",
        price: 200,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "ff9caa81-5e6f-4c33-985e-68ecbb22c2a4",
        event_plan_id: "9a0acefc-f274-43a3-acf7-8b35491e4cfe",
        name: "天幕遮陽棚（附吊燈與布幔）",
        price: 500,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
    ],
  },
  {
    id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    title: "【輕裝體驗組】雙人經典帳＋景觀營位",
    price: 2500,
    discounted_price: 1980,
    people_capacity: 0,
    created_at: "2025-05-06T06:02:24.511Z",
    updated_at: "2025-05-06T06:02:24.511Z",
    eventPlanContentBox: [
      {
        id: "07f62ac1-4b8c-4b7e-ae6c-461f853ad75e",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        content: "提供睡墊、野營椅與 LED 露營燈，適合輕裝入門旅人或好友同行",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "10fb4a67-0906-47b1-bfd7-e88faf38e5b4",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        content: "晚餐升級：山野燒肉組（牛豬雙拼＋野菜盤＋手工醬料）",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "a75c1edb-102b-4755-87f2-108ead468994",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        content: "營位鄰近溪谷步道與夜間投影活動區，視野遼闊，景觀絕佳",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "72057124-7943-42dc-bece-6999a21e80cb",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        content: "贈送手沖咖啡體驗一次（每帳），享受早晨山林香氣",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
    ],
    eventPlanAddonBox: [
      {
        id: "a87b5420-bc8b-4d9e-8fe8-49e9aa174cca",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        name: "延長住宿至中午12點退房",
        price: 200,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "04fb5395-b485-497b-971d-f395c4944704",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        name: "簡易炊事套組（瓦斯爐＋鍋具＋餐具）",
        price: 350,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "f976b8be-d238-48a6-8131-4c1bc4a9cb7c",
        event_plan_id: "7790be36-961f-4a71-9540-ad2c3fbf7544",
        name: "露天投影機租用（含布幕＋藍牙喇叭）",
        price: 500,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
    ],
  },
  {
    id: "f33db690-d95e-418c-b34a-e6d202dd8800",
    event_info_id: "d30a54cf-b1bb-4b2b-bafe-607dcae4a985",
    title: "【親子專屬帳篷區】四人帳含玩水裝備＋森林任務包",
    price: 2800,
    discounted_price: 2100,
    people_capacity: 0,
    created_at: "2025-05-06T06:02:24.511Z",
    updated_at: "2025-05-06T06:02:24.511Z",
    eventPlanContentBox: [
      {
        id: "8b860ac6-5241-4db6-b02e-f03b3b4c2d7b",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        content: "提供親子四人帳（附睡墊與室內小燈飾），營位距離溪水僅10公尺",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "af23f59f-9561-4bb5-9d68-9a529ebaf18d",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        content: "包含親水安全裝備（兒童浮具、防滑水鞋、戶外地墊）",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "dcdd4f26-50ab-4365-9bb3-51247bc4cfeb",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        content: "每組家庭將獲得『森林任務包』一份，鼓勵孩子與自然互動",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "7a516e4c-f588-4215-91ac-0548c7d8b156",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        content: "晚餐為親子互動式焚火料理體驗（附專人指導與食材）",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "9d2155b9-b007-4624-b0ff-6e7b9ea187ff",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        content: "營地特設夜間微光燈區，適合小朋友探索與說故事時光",
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
    ],
    eventPlanAddonBox: [
      {
        id: "adb54215-fa2b-42d0-a0d5-2c3737c90b2e",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        name: "專屬攝影服務（15 張精修照）",
        price: 600,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "31d73679-2e68-4d96-888b-9e15102028a1",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        name: "多功能親子遊戲帳",
        price: 400,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
      {
        id: "85992123-f6a5-49bb-81a9-a4d20e767532",
        event_plan_id: "f33db690-d95e-418c-b34a-e6d202dd8800",
        name: "泡泡機與戶外玩具組",
        price: 150,
        created_at: "2025-05-06T06:02:24.511Z",
        updated_at: "2025-05-06T06:02:24.511Z",
      },
    ],
  },
];

interface Props {
  data?: EventPlan[];
  close_Time?: string; // 報名截止時間
}
// 集中方案表單資料 1.方案選項 2.加購選項
export default function EventPlansSection({
  data = mockPlans,
  close_Time = "2025-07-30",
}: Props) {
  // 表單資料主體連接 預設選擇第一項方案
  const form = useForm<FormType>({
    resolver: zodResolver(eventPlanSchema),
    defaultValues: {
      plan: {
        event_plan_id: data[0]?.id,
        quantity: 1,
        event_plan_price: data[0]?.discounted_price,
      },
      plan_addons: [], 
    },
  });

  // const { control } = form;
  // 監聽 plan 方案變化
  // const selectedPlanId = useWatch({
  //   control,
  //   name: "plan.event_plan_id",
  // });
  
  // 監聽方案價格和所有加購選項
  // const [planPrice, addon ] = useWatch({
  //   control,
  //   name: ["plan.event_plan_price",'plan_addons'],
  // });
  
  // const totalPrice =
  //   (typeof planPrice === "number" ? planPrice : 0) +
  //   (Array.isArray(addon)
  //     ? addon.reduce((sum, item) => sum + (item?.price ?? 0), 0)
  //     : 0);
  

  // 將方案資料分割成 1.方案選項 2.加購選項 兩部份傳入元件
  const planData: PlanData[] = data?.map((item) => {
    return {
      id: item.id,
      title: item.title,
      deadline: close_Time,
      features: item.eventPlanContentBox,
      price: item.discounted_price,
      originalPrice: item.price,
      addonBox: item?.eventPlanAddonBox
    };
  });
  

  const onSubmit = (data: FormType) => {
    console.log("送出資料", data); // 看使用者勾了哪些加購項目
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          id="plan"
          className="event_plan_section space-y-10"
        >
          <p className="heading-2">選擇方案</p>
          <EventPlanSelector name="plan" plans={planData} />
        </div>
      </form>
    </FormProvider>
  );
}
