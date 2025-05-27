"use client"
import EventPlanCard from "./EventPlanCard";

export default function EventPlansSection() {
  const mockFeatures = [
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
  ];
  return (
    <div className="event_plan_section px-6 py-4 space-y-4 bg-gray-200 rounded-lg shadow-md">
      <p className="heading-3">選擇方案</p>
      <EventPlanCard
        id='1'
        title="【年末春遊 35%Off 露營季優惠】苗栗露營｜基本方案A（基本4人含小孩）"
        deadline="2025-04-05"
        features={mockFeatures}
        price={1769}
        originalPrice={2000}
        onSelect={() => console.log("方案已選")}
        isSelected={false}
      />
    </div>
  );
}
