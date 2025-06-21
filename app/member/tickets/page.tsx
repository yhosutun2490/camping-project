import EventTicketList from "@/components/Member/EventTicketList"
import {memberGetOrders} from "@/api/server-components/member/orders"

export default async function MemberTickets() {
    const ordersPaidResponse = await memberGetOrders('Paid');
    const ordersRefundResponse = await memberGetOrders('Refunded');
    const ordersRefundingResponse =  await memberGetOrders('Refunding');
    const ordersPaid = ordersPaidResponse?.orders ?? [];
    const ordersRefund = ordersRefundResponse?.orders ?? [];
    const ordersRefunding = ordersRefundingResponse?.orders ?? [];
  
    return <div className="member_tickets_page">
      <p className="heading-2 text-neutral-950 mb-4">我的活動票卷</p>
      <EventTicketList ordersPaid={ordersPaid} ordersRefund={ordersRefund} ordersRefunding={ordersRefunding}/>
    </div>
}