"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";

interface Props {
  isAddFavorite: boolean
  className?: string
}
export default function AddFavoriteButton({isAddFavorite=false,className}:Props) {
  const iconName = isAddFavorite
    ? "material-symbols-light:favorite"
    : "material-symbols-light:favorite-outline";
  return (
    <button className={clsx("btn shadow-none bg-gray-100 border-none rounded-xl text-neutral-950",className)}>
      <Icon icon={iconName} width={24} height={24} className="text-inherit"/>
      <p>收藏</p>
    </button>
  );
}
