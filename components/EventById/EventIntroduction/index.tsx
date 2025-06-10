import ImageSkeleton from "@/components/ImageSkeleton";

interface Props {
  photo_url: string;
  detail: string;
}
export default function EventIntroduction({ photo_url, detail }: Props) {
  return (
    <div id="event-intro" className="event_introduction md:mt-20 space-y-6">
      <p className="heading-2">活動介紹</p>
      <div className="relative w-full h-[482px]">
        <ImageSkeleton
          src={photo_url}
          alt={'活動介紹圖片'}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover rounded-lg"
          fallbackSrc="/main/main_bg_top_3.jpg"
        />
      </div>
      <p className="text-base text-neutral-900">{detail}</p>
    </div>
  );
}
