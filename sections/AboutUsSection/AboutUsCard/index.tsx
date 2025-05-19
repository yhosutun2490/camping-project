import Image from "next/image";
interface Props {
  data: {
    title: string;
    image: string;
    description: string;
  };
}

export default function AboutUsCard({
  data: { title, image, description },
}: Props) {
  return (
    <div className="about_card border-2 p-[1rem] lg:p-[1.5rem] border-primary-300 rounded-xl 
    shadow-sm flex space-x-3 items-center lg:flex-col lg:justify-between lg:min-h-[304px]">
      <figure className="flex items-center justify-center min-w-16 h-16 bg-primary-50 rounded-full lg:hidden">
        <Image width={32} height={32} src={image} alt={title} />
      </figure>
      <div className="p-0 text-start lg:text-center lg:flex lg:flex-col lg:gap-[1.25rem]">
        <p className="title heading-5 2xl:hidden">{title}</p>
        <p className="title heading-3 hidden 2xl:block">{title}</p>
        <figure className="mx-auto lg:inline-flex lg:justify-center lg:items-center w-16 h-16 bg-primary-50 rounded-full hidden lg:block">
          <Image width={32} height={32} src={image} alt={title}/>
        </figure>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}
