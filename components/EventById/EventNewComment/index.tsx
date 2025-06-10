import CommentCard from "@/components/CommentCard";
import type { TypeCommentCard } from "@/components/CommentCard";
import RatingStarIcon from "@/components/ClientIcon/RatingStarIcon";
import CheckCommentButton from "./CheckCommentButton";

interface Props {
  data: {
    rating: number;
    counts: number;
    comment_data: TypeCommentCard[]
  };
}

export default function EventNewComment({data}:Props) {
  const {
    rating = 4,
    counts = 78,
    comment_data
  } = data
  return (
    <div id="event_comment" className="md:mt-20 event_new_comment flex flex-col gap-10">
      <div className="comment_info flex md:gap-6 items-center">
        <p className="heading-3 md:heading-2">最新評論</p>
        <div className="comment_rating flex items-center space-x-2">
          <RatingStarIcon width={24} height={24} className="ml-2"/>
          <span className="heading-5">{rating}</span>
          <span className="text-base text-neutral-700">({counts})</span>
        </div>
        <CheckCommentButton className="ml-auto"/>
      </div>
      <div className="comment_cards grid gap-8 grid-cols-1 md:grid-cols-2">
        {comment_data?.map((item, idx) => (
          <CommentCard
            key={item.comment?.id ?? idx}
            userInfo={item.userInfo}
            eventInfo={item.eventInfo}
            comment={item.comment}
          />
        ))}
      </div>
    </div>
  );
}
