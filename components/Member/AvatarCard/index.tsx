"use client";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
type Props = {
  username: string;
};
export default function AvatarCard({ username }: Props) {
  return (
    <div
      className="member_info_avatar_card flex flex-col 
     rounded-3xl items-center px-[3rem] py-[1.5rem]"
    >
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image
            src="/header/user_image.jpg"
            width={35}
            height={35}
            alt="Picture of the author"
            className="cursor-pointer"
          />
        </div>
      </div>
      <p className="text-primary-500">{username}</p>
      <Link href="/member" className="flex items-center pl-[15px] space-x-1 text-primary-500 underline decoration-1">
        <p>管理個人資料 </p>
        <Icon icon="maki:arrow" width={20} height={20}></Icon>
      </Link>
    </div>
  );
}
