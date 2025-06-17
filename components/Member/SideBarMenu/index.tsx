"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { usePathname } from "next/navigation"; // ⬅️ 改用 usePathname
type Props = {
  lists: {
    id: string;
    link: string;
    title: string;
    icon: string;
  }[];
  setShowSidebar?: (state: boolean) => void;
};

export default function SideBarMenu({ lists, setShowSidebar }: Props) {
  const pathname = usePathname();
  return (
    <div className="menu_list text-neutral-500">
      <ul className="menu rounded-box w-full flex flex-col 2xl:gap-4 space-y-2">
        {lists.map((item) => {
          const isActive = pathname === item.link 
          return (
            <li key={item.id}>
              <Link
                href={item.link}
                onClick={() => setShowSidebar?.(false)} // 手機版點擊後收合
                className={clsx(
                  "w-full h-[45px] rounded-lg px-4 py-2 flex items-center space-x-2 transition-colors",
                  isActive
                    ? "bg-primary-300 text-white font-semibold"
                    : "hover:bg-primary-100"
                )}
              >
                <Icon
                  icon={item.icon}
                  width={20}
                  height={20}
                />
                <p className="text-sm">{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
