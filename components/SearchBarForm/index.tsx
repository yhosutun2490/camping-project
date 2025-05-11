"use client";
import { Icon } from "@iconify/react";
import { useForm, FormProvider, SubmitHandler,SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchBarFormSchema } from "@/schema/SearBarForm";
import Dropdown from "./DropDown";
import PersonCounter from "./PersonCounter";
import DatePickerField from "./DatePickerFIeld";
import { useRouter } from "next/navigation";
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
  const router = useRouter()


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
  
  const onError: SubmitErrorHandler<FormType> = (errors) => {
    console.log("驗證失敗欄位：", errors);
  };
  
  const onSubmit: SubmitHandler<FormType> = (data) => {
    try {
      const personCounts = Object.values(data.person).reduce((acc, count) => acc + count, 0);
      // 1. 把 data 攤平／序列化成 key=value
      const params = new URLSearchParams();
      if (data?.location) {
        params.set("location", data?.location ?? '');
      }
      if (personCounts) {
        params.set("person", String(personCounts));
      }

      if (data.dateRange.from) {
        params.set("from", data.dateRange.from);
      }
      if (data.dateRange.to) {
        params.set("to", data.dateRange.to);
      }

      // 2. 用 router.push 帶參數跳頁
      router.push(`/event?${params.toString()}`);
    } catch(err) {
      console.warn('導向活動列表頁有誤',err)
    }
   
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
        <form onSubmit={form.handleSubmit(onSubmit,onError)} className="flex">
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
          <button type="submit" className="bg-primary-500 rounded-full w-[3rem] h-[3rem] flex 
          cursor-pointer justify-center items-center hover:bg-primary-300">
            <Icon icon='material-symbols:search' className="text-white" width={30} height={30} />
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
