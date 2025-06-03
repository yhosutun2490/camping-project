"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";
interface Props {
    width:number
    height: number,
    className?: string
}

export default function RatingStarIcon({
    width=24,
    height=24,
    className
}: Props) {
  return (
    <Icon
      icon="uit:favorite"
      width={width}
      height={height}
      className={clsx("text-primary-500",className)}
    />
  );
}
