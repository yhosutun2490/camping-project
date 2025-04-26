export default async function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="member_pag_layout
    lg:grid lg:grid-cols-[300px_1fr] overflow-hidden pt-[60px]"
    >
      <aside>
        <ul className="menu bg-base-200 rounded-box w-full">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
}
