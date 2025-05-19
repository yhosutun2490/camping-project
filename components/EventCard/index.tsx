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
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份從 0 開始，要 +1
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
  };
  return (
    <div className="card bg-white w-full max-w-full h-full p-8 shadow-sm flex flex-col gap-4">
    <div className="date_info flex text-base justify-between items-center">
      <p className="text-neutral-700">{formatDate(date?.start)} - {formatDate(date?.end)}</p>
      <p className="text-primary-500 font-semibold">報名人數: {person?.subscribed} / {person?.max}</p>
    </div>

    <figure className="w-full relative aspect-[3/2]">
      <Image
        src={image || "/event/event_1.png"}
        alt="event"
        fill
        className="rounded-xl w-full h-auto object-cover"
      />
      <div className="absolute badge border-none bg-primary-100 text-primary-500 
        top-6 right-0 rounded-r-none">
        {category}
      </div>
    </figure>

    <div className="card-body p-0 flex flex-col gap-2">
      <h2 className="card-title text-2xl text-neutral-950">{title}</h2>
      <div className="price flex items-baseline">
        <span className="text-xl text-primary-500 font-bold">NT$ {price}</span>
        <span className="text-base text-neutral-700 pl-2">/ 每人</span>
      </div>
      <div className="card-actions mt-auto">
        <button className="w-full btn-primary">更多資訊</button>
      </div>
    </div>
  </div>
  );
}
