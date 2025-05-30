import Image from "next/image";

interface Props {
  photo_url?: string;
  detail?: string;
}
export default function EventIntroduction({ 
    photo_url, 
    detail 
}: Props) {
  return (
    <div id="event-intro" className="event_introduction md:mt-20 space-y-6">
      <p className="heading-2">活動介紹</p>
      <div className="relative w-full h-[482px]">
        <Image
            fill 
            src={photo_url || '/event_id/event_intro_test.png'} 
            alt="活動介紹圖片" 
            className="object-cover aspect-[5/3] rounded-xl" 
        />
      </div>
      <p className="text-base text-neutral-900">{detail}</p>
    </div>
  );
}
