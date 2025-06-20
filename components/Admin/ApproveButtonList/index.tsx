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
      <button className="btn-error  flex-grow-1 text-xs h-8 flex justify-center items-center gap-1">
        <IconWrapper icon="mdi:close" className="text-white"></IconWrapper>
        退回
      </button>
    </div>
  );
}
