"use client";
import { Icon } from "@iconify/react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchBarFormSchema } from "@/schema/SearBarForm";
import Dropdown from "./DropDown";
import PersonCounter from "./PersonCounter";
import DatePickerField from "./DatePickerFIeld";

interface Props {
  isBgBlur?: boolean,
  bgColor?: string,
}
type FormType = z.infer<typeof searchBarFormSchema>;


export default function SearchBarForm({isBgBlur = true, bgColor}:Props) {
  const form = useForm<FormType>({
    resolver: zodResolver(searchBarFormSchema),
    shouldUnregister: true,
    defaultValues: {
      location: 'Taipei',
      price: 0,
      person: {
        adults: 0,
        children: 0,
        pets: 0
      },
      dateRange: { from: undefined, to: undefined },
    },
  });


  // 地點選擇
  const locationOptions = [
    {
      id: "1",
      label: "台北",
      value: "Taipei",
    },
    {
      id: "2",
      label: "台南",
      value: "Tainan",
    },

    {
      id: "3",
      label: "台中",
      value: "Taichung",
    },
  ];

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log("搜尋參數：", data);
  };
  return (
    <div
      id="search_bar_form"
      className={`
        w-full px-[24px] py-[12px] overflow-visible 
        select-none cursor-pointer border-2 border-neutral-300 
        rounded-full
        ${bgColor}
        ${isBgBlur ? 'bg-white/40 backdrop-blur-sm' : ''}
      `}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <div className="form_input_wrapper flex flex-grow-1 gap-4 items-center divide-x divide-white/30">
            <div className="flex flex-col bg-grey grow-1 relative">
              <div className="flex items-center gap-1">
                <Icon icon='mdi:location' className="text-white" width={20} height={20} />
                <span>地點</span>
              </div>
              <Dropdown options={locationOptions} fieldName="location"/>
            </div>
            <div className="flex flex-col bg-grey grow-1 relative">
              <div className="flex items-center gap-1">
                <Icon icon='mdi:account-multiple-outline' className="text-white" width={20} height={20} />
                <span>人數</span>
              </div>
              <PersonCounter />
            </div>
            <div className="flex flex-col bg-grey grow-1 relative">
              <div className="flex items-center gap-1">
                <Icon icon='mynaui:calendar' className="text-white" width={20} height={20} />
                <span>日期</span>
              </div>
              <DatePickerField />
            </div>
          </div>
          <button className="bg-primary-500 rounded-full w-[3rem] h-[3rem] flex justify-center items-center">
            <Icon icon='material-symbols:search' className="text-white" width={30} height={30} />
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
