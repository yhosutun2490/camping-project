"use client"
import Link from 'next/link'
import { Icon } from "@iconify/react";
type Props = {
  lists: {
    id: string;
    link: string;
    title: string;
    icon: string;
  }[];
  setShowSidebar?: (state: boolean)=>void
};

export default function SideBarMenu({ lists, setShowSidebar }: Props) {
  return (
    <div className="menu_list text-neutral-500">
      <ul className="menu rounded-box w-full flex flex-col 2xl:gap-4">
        {lists.map((item) => (
          <li key={item.id}>
            <Link
              href={item.link}
              onClick={() => setShowSidebar?.(false)} // 手機版點擊後收合
              className="w-full h-[45px] hover:bg-primary-100 rounded-lg px-4 py-2 flex items-center space-x-2"
            >
              <Icon icon={item.icon} width={20} height={20} className="text-neutral-500" />
              <p className="text-sm">{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}