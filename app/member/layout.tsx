import AvatarCard from "@/components/Member/AvatarCard";
import SideBarMenu from "@/components/Member/SideBarMenu";

export default async function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const menuLists = [
    {
        id: '1',
        link: '/member/tickets',
        title: '我的活動票卷',
        icon: 'mingcute:ticket-line'
    },
    {
        id: '2',
        link: '/member/calendar',
        title: '活動行事曆',
        icon: 'icon-park-outline:calendar'
    },
    {
        id: '3',
        link: '/member/favorite',
        title: '收藏清單',
        icon: 'ic:outline-favorite'
    },
    {
        id: '4',
        link: '/host/event',
        title: '個人發起活動',
        icon: 'fluent-mdl2:user-event'
    },
    {
        id: '5',
        link: '/member/payment',
        title: '付款方式',
        icon: 'hugeicons:payment-02'
    },
    {
        id: '6',
        link: '/member/account',
        title: '帳戶管理',
        icon: 'mdi:account-multiple-outline'
    },
  ]
  return (
    <div
      className="member_pag_layout
    lg:grid lg:grid-cols-[300px_1fr] h-full overflow-hidden pt-[60px]"
    >
      <aside className="border-r-1 h-full pt-4 shadow-md bg-primary-50">
        <AvatarCard username="Rafael"/>
        <SideBarMenu lists={menuLists}/>
    
      </aside>
      <main className="h-full pt-6 px-[5%]">{children}</main>
    </div>
  );
}
