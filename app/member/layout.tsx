import AvatarCard from "@/components/Member/AvatarCard";
import SideBarMenu from "@/components/Member/SideBarMenu";
import { memberGetProfile } from "@/api/server-components/member/profile"
export const dynamic = 'force-dynamic' 
export default async function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const memberInfo = await memberGetProfile()
  const menuLists = [
    {
      id: '0',
      link: '/member',
      title: '管理個人資料',
      icon: 'mingcute:ticket-line'
  },
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
      className="member_page_layout relative
     grid grid-cols-[300px_3fr] h-screen pt-[60px]"
    >

      <aside className="h-full sticky top-5 shadow-md bg-primary-50">
        <AvatarCard userInfo={{photo_url: memberInfo?.data.member.photo_url, username: memberInfo?.data.member.username}}/>
        <SideBarMenu lists={menuLists}/>
      </aside>
      <main className="overflow-y-auto h-full pt-6 pb-[60px] px-[5%] bg-white">{children}</main>
    </div>
  );
}
