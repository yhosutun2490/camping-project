"use client"
import IconWrapper from "@/components/ClientIcon/IconWrapper";
import clsx from "clsx";

interface Props {
    className?: string
}
export default function ApproveButtonList({className}:Props) {
  return (
    <div className={clsx("flex flex-col gap-4",className)}>
      <button className="btn-primary flex-grow-1 text-xs h-8 flex justify-center items-center gap-1">
        <IconWrapper icon="mdi:check" className="text-white"></IconWrapper>
        通過
      </button>
      <button className="cursor-pointer font-bold px-4 py-2 h-8 flex-grow-1 bg-orange-500 rounded-2xl 
      text-white text-xs h-8 flex justify-center items-center gap-1 hover:bg-orange-700">
        <IconWrapper icon="mdi:close" className="text-white"></IconWrapper>
        退回
      </button>
    </div>
  );
}
