import RatingStar from "@/components/RatingStar";
import { Icon } from "@iconify/react/dist/iconify.js";
interface EventBasicInfoProps {
  eventName?: string;
  startTime?: string;
  endTime?: string;
  address?: string;
  description?: string;
  policy?: string;
  rating?: number;
  ratingCount?: number;
  commentCount?: string;
}

export default function EventBasicInfo(props: EventBasicInfoProps) {
  const {
    eventName = "年末春遊 35%Off 露營季優惠 苗栗露營｜自然圈免裝備露營｜一泊二食＆包圓專案",
    startTime = "2025-05-30",
    endTime = "2025-06-30",
    address = "台灣・苗栗",
    description = `炎炎夏日避暑首選，親子戲水、溪邊煮食、夜晚營火晚會，讓孩子與大自然建立連結！`,
    policy = "15天前可免費取消 ・ 現場出示電子憑證",
    rating = 4.5,
    ratingCount = 96,
    commentCount = "已售出 700+",
  } = props;

  return (
    <div className="event_basic_info">
      <p className="event_title heading-3">{eventName}</p>
      <div className="event_info flex flex-col mt-4 divide-y divide-gray-300">
        <div className="location flex space-x-2 items-center text-gray-700 h-10 leading-10">
          <Icon icon="mdi:address-marker" width={24} height={24} className="text-inherit"/>
          <p>{address}</p>
        </div>
        <div className="date flex space-x-2 items-center text-gray-700 h-10 leading-10">
          <Icon icon="material-symbols-light:date-range-outline" width={24} height={24} className="text-inherit"/>
          <p>日期: {startTime} - {endTime}</p>
        </div>
        <div className="rating w-full flex space-x-2 h-10 items-center">
          <p>{rating}</p>
          <RatingStar rating={rating} starColor="bg-green-600" />
          <div>{ratingCount}</div>
          <div className="w-fit">{commentCount}</div>
        </div>
        <div className="policy text-gray-700 h-10 leading-10">{policy}</div>
        <div className="description p-4">
          {description
            ?.split(/[,，、]/) // 同時支援中英文逗號
            .filter(Boolean) // 避免空字串
            .map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
        </div>
      </div>
    </div>
  );
}
