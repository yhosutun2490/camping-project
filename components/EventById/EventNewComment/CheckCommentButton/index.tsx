"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";
type Props = {
    className?:string
}
export default function CheckCommentButton({className}:Props) {
  return (
    <button
      className={clsx(`flex gap-1 items-center px-4 py-2 border-2 
  border-primary-700 text-primary-700 rounded-2xl 
  hover:cursor-pointer hover:bg-primary-300`,className)}
    >
      <span className="heading-7">查看全部評論</span>
      <Icon icon="line-md:arrow-right" width={24} height={24} />
    </button>
  );
}
