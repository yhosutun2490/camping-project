"use client";
import EventTicketCard from "./EventTicketCard";
import EventTicketStatusTab from "@/components/Member/EventTicketStatusTab";
import type { TabList } from "@/components/Member/EventTicketStatusTab"
import type { EventTicket } from "@/components/Member/EventTicketList/EventTicketCard"
import { useState } from "react";

const tabList = [
  {
    label: "即將到來",
    value: "incoming",
  },
  {
    label: "已完成",
    value: "finished",
  },
  {
    label: "已取消(退款)",
    value: "refund",
  },
];

const groupedTickets: { [key: string]: EventTicket[] } = {
  incoming: [
    {
      imageUrl: "/images/camp1.jpg",
      status: "incoming",
      title: "台中露營｜森林小屋體驗營",
      planName: "兩天一夜・附早餐",
      orderNumber: "#ORD12345678",
      date: "2025-07-15",
      price: 1800,
    },
  ],
  finished: [
    {
      imageUrl: "/images/camp2.jpg",
      status: "finished",
      title: "苗栗露營｜自然圈免裝備露營",
      planName: "一泊二食＆包團專案",
      orderNumber: "#ORD87654321",
      date: "2025-03-20",
      price: 2000,
    },
  ],
  refund: [
    {
      imageUrl: "/images/camp3.jpg",
      status: "refund",
      title: "宜蘭星空營地｜取消預約",
      planName: "三天兩夜豪華帳篷",
      orderNumber: "#ORD55558888",
      date: "2025-06-01",
      price: 3200,
    },
  ],
};
export default function EventTicketList() {
  const [activeTab, setActiveTab] = useState<TabList>(tabList[0])
  const activeTicketLists = groupedTickets[activeTab.value]
  return (
    <div className="member_tickets_list space-y-6 md:space-y-8">
      <EventTicketStatusTab
        tabList={tabList}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTicketLists.map(ticket => (
        <EventTicketCard
          key={ticket.orderNumber}
          imageUrl={ticket.imageUrl}
          status={ticket.status}
          title={ticket.title}
          planName={ticket.planName}
          orderNumber={ticket.orderNumber}
          date={ticket.date}
          price={ticket.price}
        />
      ))}
    </div>
  );
}
