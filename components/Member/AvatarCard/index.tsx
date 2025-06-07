"use client";
import Image from "next/image";
type Props = {
  userInfo: {
    username?: string ,
    photo_url?: string 
  }
};
export default function AvatarCard({ userInfo }: Props) {
  return (
    <div
      className="member_info_avatar_card bg-neutral-100 border-1 border-neutral-300 t flex flex-col 
     rounded-3xl items-center px-[84px] py-[1.5rem] space-y-2"
    >
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image
            src={userInfo.photo_url || "/header/user_image.jpg"}
            width={25}
            height={25}
            alt="Picture of the author"
            className="cursor-pointer"
          />
        </div>
      </div>
      <p className="heading-6 text-neutral-950">{userInfo.username || 'User'}</p>
    </div>
  );
}
