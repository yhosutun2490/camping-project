"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface Props {
  icon: string; // ← 加入 icon 名稱作為參數
  width?: number;
  height?: number;
  className?: string;
}

export default function IconWrapper({
  icon,
  width = 24,
  height = 24,
  className,
}: Props) {
  return (
    <Icon
      icon={icon}
      width={width}
      height={height}
      className={clsx("text-primary-500", className)}
    />
  );
}