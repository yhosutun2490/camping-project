
import SidebarToggle from "@/components/Member/SideBarToggle";
import { memberGetProfile } from "@/api/server-components/member/profile";
export const dynamic = "force-dynamic";
export default async function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const memberInfo = await memberGetProfile();
  const menuLists = [
    {
      id: "0",
      link: "/member",
      title: "管理個人資料",
      icon: "tdesign:user",
    },
    {
      id: "1",
      link: "/member/tickets",
      title: "我的活動票卷",
      icon: "mingcute:ticket-line",
    },
    {
      id: "3",
      link: "/member/favorite",
      title: "收藏活動清單",
      icon: "ic:outline-favorite",
    },
  ];

  return (
    <div
      className="member_page_layout
    grid md:grid-cols-[304px_1fr] min-h-0 px-[5%] lg:px-[8%] xl:px-[15%] pt-[40px] gap-10"
    >
      <SidebarToggle
        memberInfo={{
          photo_url: memberInfo?.data.member.photo_url ?? "",
          username: memberInfo?.data.member.username ?? "",
        }}
        menuLists={menuLists}
      />
      <main className=" min-h-0">{children}</main>
    </div>
  );
}
