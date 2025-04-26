import AvatarCard from "@/components/Member/AvatarCard";

export default async function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="member_pag_layout
    lg:grid lg:grid-cols-[300px_1fr] h-full overflow-hidden pt-[60px]"
    >
      <aside className="border-r-1 border-primary h-full pt-4">
        <AvatarCard username="Rafael"/>
    
      </aside>
      <main className="h-full pt-6">{children}</main>
    </div>
  );
}
