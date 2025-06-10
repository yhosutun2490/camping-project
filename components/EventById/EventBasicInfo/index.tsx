"use client";
import AddFavoriteButton from "../AddFavoriteButton";
import { Icon } from "@iconify/react";

interface EventBasicInfoProps {
  data: {
    eventName?: string;
    startTime?: string;
    endTime?: string;
    address?: string;
    policy?: string;
    rating?: number;
    ratingCount?: number;
    commentCount?: string;
  };
}

export default function EventBasicInfo(props: EventBasicInfoProps) {
  const {
    eventName = "年末春遊 35%Off 露營季優惠 苗栗露營｜自然圈免裝備露營｜一泊二食＆包圓專案",
    startTime = "2025-05-30",
    endTime = "2025-06-30",
    address = "台灣・苗栗",
    policy = "15天前可免費取消,現場出示電子憑證",
    rating = 0,
    ratingCount = 0,
    commentCount = "目前未售出",
  } = props.data;

  return (
    <div className="event_basic_info">
      <p className="event_title heading-1">{eventName}</p>
      <div className="event_info flex flex-col md:flex-row flex-wrap justify-between mt-4">
        {/*基本資訊*/}
        <section className="basic_info_section">
          <div className="location flex space-x-2 items-center heading-5 h-10">
            <Icon
              icon="mdi:address-marker"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <p>{address}</p>
          </div>
          <div className="date flex space-x-2 items-center heading-5 h-10">
            <Icon
              icon="material-symbols-light:date-range-outline"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <p>
              日期: {startTime} - {endTime}
            </p>
          </div>
          <div className="event_rating w-full flex space-x-2 h-10 items-center text-neutral-950">
            <Icon
              icon="uit:favorite"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <p className="heading-5">{rating}</p>
            <div className="text-base">{ratingCount}</div>
            <div className="text-base w-fit">{commentCount}</div>
          </div>
        </section>
        {/*取消政策*/}
        <div className="policy flex flex-col heading-5">
          {policy
            ?.split(/[,，、]/) // 同時支援中英文逗號
            .filter(Boolean) // 避免空字串
            .map((item, index) => (
              <div key={index} className="flex space-x-2 h-10">
                <Icon
                  icon="charm:tick"
                  width={24}
                  height={24}
                  className="text-primary-500"
                />
                <span>{item.trim()}</span>
              </div>
            ))}
        </div>
        {/*收藏*/}
        <AddFavoriteButton isAddFavorite={false} className="mt-4 md:mt-0" />
      </div>
    </div>
  );
}
