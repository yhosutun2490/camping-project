import Image from "next/image";
import RatingStar from "../RatingStar";

interface Props {
  userInfo: {
    user_id: string;
    name: string;
    image: string;
  };
  eventInfo: {
    event_id: string;
    event_name: string;
    host_id: string;
    host_name: string;
  };
  comment: {
    id: string;
    description: string;
    date: string;
    rating: number;
  };
}

export default function CommentCard({ userInfo, eventInfo, comment }: Props) {
  return (
    <div className="comment_card_wrap space-y-[1.25rem]">
      <div className="user_row flex gap-4 justify-between">
        <div className="user_info flex gap-4">
          <div className="avatar w-16 h-16">
            <Image
              src={userInfo.image || "/header/user_image.jpg"}
              width={64}
              height={64}
              alt={userInfo.name}
              className="cursor-pointer aspect-1 rounded-full"
            />
          </div>

          <div className="user_name text-start space-y-1">
            <p className="heading-5">{userInfo.name}</p>
            <p className="text-sm">{comment.date}</p>
          </div>
        </div>
        <RatingStar rating={comment.rating} ratingSizeClass="rating-xs self-center"/>
      </div>
      <div className="event_info flex justify-between rounded-2xl bg-primary-50 px-3 py-2">
        <p className="heading-7"> {eventInfo.event_name}</p>
        <p className="text-xs"> 主辦方- {eventInfo.host_name}</p>
      </div>
      <div className="comment text-sm text-start text-neutral-700 line-clamp-4">
        <p> {comment.description} </p>
      </div>
    </div>
  );
}
