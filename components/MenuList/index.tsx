"use client"
import Link from "next/link";
import React from "react";
import clsx from 'clsx'
type Props = {
    list: {
      id: string;
      title: string;
      link: string;
    }[];
    children?: React.ReactNode;
    className?: string; 
  };

export default function MenuList({list, children, className}: Props) {
    return (
        <ul className={clsx("bg-white rounded-lg shadow-md", className)}>
          {list.map((item) => (
            <li key={item.id} className="text-xl text-black px-4 py-2">
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
           <li className="text-xl text-black px-4 py-2">
              {children}
            </li>
        </ul>
      );
}
