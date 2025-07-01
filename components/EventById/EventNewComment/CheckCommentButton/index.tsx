"use client";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import type { TypeCommentCard } from "@/components/CommentCard";
import CommentCard from "@/components/CommentCard";
import DialogModal from "@/components/DialogModal";
import { useRef } from "react";
type Props = {
  className?: string;
  comment_data: TypeCommentCard[];
};
export default function CheckCommentButton({ className,comment_data }: Props) {
  const modalId = `event-comment`;
  const commentModalRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <label
        htmlFor={modalId}
        className={clsx(
          `flex gap-1 items-center px-4 py-2 border-2 
  border-primary-700 text-primary-700 rounded-2xl 
  hover:cursor-pointer hover:bg-primary-300`,
          className
        )}
      >
        <span className="heading-7">查看全部評論</span>
        <Icon icon="line-md:arrow-right" width={24} height={24} />
      </label>

      <DialogModal id={modalId} modalRef={commentModalRef}>
        <div className="comment_cards grid gap-8 grid-cols-1 px-10">
          {comment_data?.map((item, idx) => (
            <CommentCard
              key={item.comment?.id ?? idx}
              userInfo={item.userInfo}
              eventInfo={item.eventInfo}
              comment={item.comment}
            />
          ))}
        </div>
      </DialogModal>
    </>
  );
}
