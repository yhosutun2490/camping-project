import Image from "next/image";
import RatingStar from "@/components/RatingStar";
interface Props {
  data: {
    rating: number;
    image: string;
    description: {
      title: string,
      subtitle: string
    };
  };
}

export default function IntroCard({
  data: { rating, image, description },
}: Props) {
  return (
    <div className="intro_card p-[1rem] lg:p-[1.5rem] bg-neutral-50 rounded-xl 
    shadow-sm flex space-x-3 items-center lg:flex-col lg:justify-between lg:min-h-[304px]">
      <figure className="lg:hidden">
        <Image width={96} height={96} src={image} alt={description.title} className="rounded-xl"/>
      </figure>
      <div className="p-0 w-full text-start lg:text-center lg:flex lg:flex-col lg:gap-[1.25rem]">
        <div className="rating_wrap flex gap-[0.5rem] justify-between lg:flex-col lg:items-center">
            <p className="text-xs text-neutral-700 lg:text-base">挑戰難度</p>
            <RatingStar rating={rating} />
        </div>
        <figure className="mx-auto hidden max-w-[300px] max-h-[300px] aspect-[1/1] lg:block">
          <Image width={300} height={300} src={image} alt={description.title} 
            className="rounded-xl"/>
        </figure>
         <div className="description">
            <p className="heading-5 lg:hidden text-neutral-950">{description.title}</p>
            <p className="heading-3 hidden lg:block text-neutral-950">{description.title}</p>
            <p className="text-sm lg:h-[54px] lg:!text-lg text-neutral-700">{description.subtitle}</p>
         </div>
      </div>
    </div>
  );
}
