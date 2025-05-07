import Image from "next/image";
interface Props {
  date?: {
    start: string;
    end: string;
  };
  image?: string;
  category?: string;
  title?: string;
  price?: number;
  person?: {
    subscribed: number;
    max: number;
  };
}

export default function EventCard({
  date = {
    start: '2025-05-05',
    end: '2025-06-30'
  },
  image,
  category = '新手友善',
  title = '杜鵑賞花露營',
  price = 2000,
  person = {
    subscribed: 18,
    max: 30
  }
}: Props) {
  return (
    <div className="card bg-white w-full h-full p-8 shadow-sm flex flex-col gap-5">
      <div className="date_info flex">
        <p className="text-base text-neutral-700">{date?.start} - {date?.end}</p>
        <p className="text-primary-500 font-semibold">報名人數:   { person?.subscribed} / {person?.max}</p>
      </div>
      <figure className="w-full h-full relative">
        <Image
          src={
            image ||
            "/event/event_1.png"
          }
          alt={"shoes"}
          width={356}  
          height={264}
          className="rounded-xl aspect-4/3" 
          style={{ width: "100%", height: "auto" }}
        />
        <div className="absolute badge border-none bg-primary-100 text-primary-500 
        top-6 right-0 rounded-r-none">{ category }</div>
      </figure>
      <div className="card-body p-0">
        <h2 className="card-title text-2xl text-neutral-950">{ title }</h2>
        <div className="price flex w-fit-content">
            <span className="text-xl text-primary-500 font-bold">NT$ { price }</span>
            <span className="text-base text-neutral-700 pl-2">/  每人</span>
        </div>
        <div className="card-actions">
          <button className="w-full btn border-none bg-primary-500">更多資訊</button>
        </div>
      </div>
    </div>
  );
}
