"use client"
import Image from "next/image";
import RatingStar from "@/components/RatingStar";
import { useRouter } from "next/navigation";

interface Props {
  host?: {
    photo_url: string;
    name: string;
    member_id: string;
    rating?: number;
    response_count?: number;
    response_rate?: number;
  };
}

export default function EventHost({ host }: Props) {
  const {
    name = 'hexschool瘋露營',
    member_id = 'ce795db1-a327-4f67-a9ad-886c0ac549ac',
    photo_url = '',
    rating = 4.5,
    response_count = 208,
    response_rate = 85
  } = host ?? {};

  const router = useRouter()

  return (
    <div className="event_host_info flex gap-4 bg-primary-100 rounded-full p-4">
      <div className="host_avatar rounded-full" onClick={()=>{router.push(`/host/${member_id}`)}}>
        <Image
          src={photo_url || "/header/user_image.jpg"}
          width={64}
          height={64}
          alt="Picture of the author"
          className="cursor-pointer object-fit rounded-full aspect-1/1"
        />
      </div>

      <div className="host_info w-full flex flex-col sm:gap-1 sm:flex-row justify-between">
        <div className="host_name flex flex-col">
          <p className="hidden sm:block heading-5 text-primary-500">{name}</p>
          <p className="heading-7 sm:hidden text-primary-500">{name}</p>
          <div className="rate mt-auto hidden sm:block text-sm text-neutral-700">
            <span className="text-sm">評分: {rating}</span>
            <span className="pr-2 border-r-1">{response_count}</span>
            <span className="pl-2">回復率: {response_rate}%</span>
          </div>
          <div className="rate mt-auto text-xs sm:hidden text-neutral-700">
            <span className="text-xs">評分: {rating}</span>
            <span className="pr-2 border-r-1">{response_count}</span>
            <span className="pl-2">回復率: {response_rate}%</span>
          </div>
        </div>
        <RatingStar rating={rating} starSize="relative h-4 right-1 md:h-6 md:right-0" />
      </div>
    </div>
  );
}
