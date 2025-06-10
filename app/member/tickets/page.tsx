import EventTicketList from "@/components/Member/EventTicketList"


export default function MemberTickets() {
    return <div className="member_tickets_page">
      <p className="heading-2 text-neutral-950 mb-4">我的活動票卷</p>
      <EventTicketList />
    </div>
}