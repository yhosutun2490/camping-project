"use client";
import EventTicketCard from "./EventTicketCard";
import EventTicketStatusTab from "@/components/Member/EventTicketStatusTab";
import type { TabList } from "@/components/Member/EventTicketStatusTab"
import { useState, useMemo } from "react";
import type { GetMemberOrdersResponse } from "@/types/api/member/orders";
import type { TicketStatus } from "@/components/Member/EventTicketList/EventTicketCard"

/* ---------- 1. Tab 設定 ---------- */
const tabList = [
  { label: "即將到來", value: "incoming" },
  { label: "已完成", value: "finished" },
  { label: "退款中", value: "refunding" },
  { label: "已退款",value: "refunded" },  
];
type TabValue = (typeof tabList)[number]["value"];


interface Props {
  ordersPaid: GetMemberOrdersResponse['data']['orders']
  ordersRefunding: GetMemberOrdersResponse['data']['orders']
  ordersRefund: GetMemberOrdersResponse['data']['orders']
}
export default function EventTicketList({ordersPaid, ordersRefunding ,ordersRefund}:Props) {
  const [activeTab, setActiveTab] = useState<TabList>(tabList[0])
   /* ---------- 3. 訂單分組 ---------- */
  const { incoming, finished, refunded, refunding } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);   

    const incoming = ordersPaid.filter(o =>
      new Date(o.event_info.date) >= today
    );

    const finished = ordersPaid.filter(o =>
      new Date(o.event_info.date) < today
    );

    return { incoming, finished, refunding:ordersRefunding, refunded: ordersRefund };
  }, [ordersPaid, ordersRefunding,ordersRefund]);

  /* ---------- 4. 依 Tab 取出對應清單 ---------- */
  const groupedTickets: Record<TabValue, typeof incoming> = {
    incoming,
    finished,
    refunded,
    refunding
  };
  // 目前查看訂單種類
  const activeTicketList = groupedTickets[activeTab.value as TabValue];
  

  return (
    <div className="member_tickets_list space-y-6 md:space-y-8">
      <EventTicketStatusTab
        tabList={tabList}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      {activeTicketList.map((ticket: (typeof incoming)[number]) => (
        <EventTicketCard
          key={ticket.id}
          imageUrl={ticket.event_info.image ?? ""}
          status={activeTab.value as TicketStatus}
          title={ticket.event_info.name}
          planName={ticket.event_plan.title}
          orderNumber={ticket.id}
          date={ticket.event_info.date}
          price={ticket.total_price}
        />
      ))}
    </div>
  );
}
