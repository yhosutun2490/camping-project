"use client";
// import AddFavoriteButton from "../AddFavoriteButton";
import { Icon } from "@iconify/react";
import { formateDateTime } from "@/utils/formateDate";
import type { RegisterStatus } from "@/app/event/[id]/page"
import clsx from "clsx";

interface EventBasicInfoProps {
  data: {
    eventName?: string;
    startTime?: string;
    endTime?: string;
    registerStart?: string;
    registerClose?: string;
    address?: string;
    policy?: string;
    rating?: number;
    ratingCount?: number;
    commentCount?: string;
    bookingCounts?: number;
    maxParticipants?: number;
  };
  bookingStatus: string;
  registerStatus: RegisterStatus
}

export default function EventBasicInfo(props: EventBasicInfoProps) {
  const {
    eventName = "年末春遊 35%Off 露營季優惠 苗栗露營｜自然圈免裝備露營｜一泊二食＆包圓專案",
    startTime = "2025-05-30",
    endTime = "2025-06-30",
    registerStart,
    registerClose,
    address = "台灣・苗栗",
    policy = "15天前可免費取消,現場出示電子憑證",
    bookingCounts,
    maxParticipants,
  } = props.data;
 
  const isOnRegistering = props.registerStatus === 'registering'
 
  return (
    <div className="event_basic_info">
      <div className="event_title flex flex-wrap items-center gap-5">
        <p className="heading-1">{eventName}</p>
        <p className={clsx("badge border-none text-white heading-6", 
        isOnRegistering? "bg-primary-500": "bg-orange-500")}>
          {props.bookingStatus}
        </p>
      </div>
      <div className="event_info flex space-x-8 flex-col md:flex-row flex-wrap justify-between mt-4">
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
              icon="solar:calendar-outline"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <p>
              活動日期:{" "}
              <span>
                {formateDateTime(startTime ?? "")} -{" "}
                {formateDateTime(endTime ?? "")}
              </span>
            </p>
          </div>
          <div className="date flex space-x-2 items-center heading-5 h-10">
            <Icon
              icon="fluent-mdl2:date-time-mirrored"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <p>
              報名時間:{" "}
              <span>
                {formateDateTime(registerStart ?? "")} -{" "}
                {formateDateTime(registerClose ?? "")}
              </span>
            </p>
          </div>

          {/* <div className="event_rating w-full flex space-x-2 h-10 items-center text-neutral-950">
            <Icon
              icon="uit:favorite"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <p className="heading-5">{rating}</p>
            <div className="text-base">{ratingCount}</div>
            <div className="text-base w-fit">{commentCount}</div>
          </div> */}
        </section>
        {/*取消政策*/}
        <div className="policy register_counts flex flex-grow-1 flex-col">
          <div className="policy flex flex-col justify-start heading-5">
            {policy
              ?.split(/[,，、]/) // 同時支援中英文逗號
              .filter(Boolean) // 避免空字串
              .map((item, index) => (
                <div key={index} className="flex items-center space-x-2 h-10">
                  <Icon
                    icon="gridicons:notice-outline"
                    width={24}
                    height={24}
                    className="text-primary-500"
                  />
                  <span>{item.trim()}</span>
                </div>
              ))}
          </div>
          <div className="date flex space-x-2 items-center heading-5 h-10">
            <Icon
              icon="mdi:register-outline"
              width={24}
              height={24}
              className="text-primary-500"
            />
            <div className="flex gap-1">
              <p>已報名人數:</p>
              <p>
                {bookingCounts} / {maxParticipants}
              </p>
            </div>
          </div>
        </div>

        {/*收藏*/}
        {/* <AddFavoriteButton isAddFavorite={false} className="mt-4 md:mt-0" /> */}
      </div>
    </div>
  );
}
