
import SidebarToggle from "@/components/Member/SideBarToggle";
import { memberGetProfile } from "@/api/server-components/member/profile";
import { redirect } from "next/navigation"; 
export const dynamic = "force-dynamic";
export default async function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const memberInfo = await memberGetProfile();
  const role = memberInfo?.data.member.role 
  if (role !== "admin") {
    redirect("/"); 
  }

  const menuLists = [
    {
      id: "0",
      link: "/admin/activity",
      title: "審核活動",
      icon: "mingcute:ticket-line",
    },
  ];

  return (
    <div
      className="admin_page_layout
    grid md:grid-cols-[304px_1fr] min-h-0 px-[5%] lg:px-[8%] xl:px-[15%] py-[40px] gap-10"
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
