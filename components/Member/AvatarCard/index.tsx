"use client";
import ImageSkeleton from "@/components/ImageSkeleton";
type Props = {
  userInfo: {
    username?: string,
    photo_url?: string
  }
};
export default function AvatarCard({ userInfo }: Props) {
  return (
    <div
      className="member_info_avatar_card bg-neutral-100 border-1 border-neutral-300 t flex flex-col 
     rounded-3xl items-center px-[84px] py-[1.5rem] space-y-2"
    >
      <div className="member_photo w-24 h-24 rounded-full">
        <ImageSkeleton
          src={userInfo.photo_url || "/header/user_image.jpg"}
          width={96} // px 對應 w-24 的實體寬度
          height={96}
          alt="Picture of the author"
          className="w-full h-full aspect-[1/1] object-cover rounded-full"
        />
      </div>
      <p className="heading-6 text-neutral-950">{userInfo.username || 'User'}</p>
    </div>
  );
}
