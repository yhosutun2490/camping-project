"use client";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
type Props = {
  list: {
    id: string;
    title: string;
    link: string;
  }[];
  closeMenu: () => void;
  children?: React.ReactNode;
  className?: string;
};

export default function MenuList({
  list,
  children,
  className,
  closeMenu,
}: Props) {
  return (
    <ul className={clsx("bg-white rounded-lg shadow-md", className)}>
      {list.map((item, index) => (
        <Link
          href={item.link}
          onClick={closeMenu}
          key={item.id}
          className={clsx(
            "w-full inline-block text-xl text-black px-4 py-2 cursor-pointer hover:bg-gray-200",
            "hover:border-t", // hover 時顯示上邊框
            "hover:border-gray-300", // 邊框顏色
            index === 0 && "hover:rounded-t-lg"
          )}
        >
          <li> { item.title } </li>
        </Link>
      ))}
      <li
        className="text-xl text-black px-4 py-2  
        rounded-b-lg hover:bg-gray-300 cursor-pointer"
        onClick={closeMenu}
      >
        {children}
      </li>
    </ul>
  );
}
