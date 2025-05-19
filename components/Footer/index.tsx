import clsx from "clsx";

export default function Footer() {
  interface NavItem {
    label: string;
    url?: string;
  }

  interface NavSection {
    title: string;
    items: NavItem[];
  }

  const navData: NavSection[] = [
    {
      title: "舉辦活動",
      items: [
        { label: "常見問題", url: "/faq" },
        { label: "首次舉辦活動", url: "/first-event" },
        { label: "活動上架規範", url: "/event-guidelines" },
      ],
    },
    {
      title: "主辦百寶箱",
      items: [
        { label: "平台基礎服務", url: "/services" },
        { label: "廣告曝光方案", url: "/ads" },
      ],
    },
    {
      title: "認識我們",
      items: [{ label: "加入我們", url: "/careers" }],
    },
    {
      title: "客服中心",
      items: [
        {
          label: "service@gmail.com",
          url: "mailto:service@gmail.com",
        },
        { label: "詢問小幫手", url: "/chatbot" },
      ],
    },
  ];

  return (
    <footer className="footer bg-neutral-50 rounded-2xl p-[40px] text-base 
    grid grid-cols-2 gap-4 lg:grid-cols-4 justify-between">
      {navData.map((data) => {
        return (
          <nav key={data.title} className="w-full divide-y-1 space-y-2">
            <p className="w-full nav-title heading-5 px-4 py-3 text-primary-700"> {data.title} </p>
            <nav className="w-full nav_link text-sm md:text-base text-neutral-950 flex flex-col">
              {data.items.map((link) => {
                return (
                  <a href={link.url} key={link.label} 
                  className={clsx(link.url==='/chatbot' ? 'btn-primary hidden md:block md:w-fit px-4 py-2': 'px-3 py-4')}>
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </nav>
        );
      })}
      <button className="w-full col-span-2 flex justify-center btn-primary md:hidden">詢問小幫手</button>
    </footer>
  );
}
