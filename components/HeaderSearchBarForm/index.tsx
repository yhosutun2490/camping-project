"use client";
import { Icon } from "@iconify/react";
import { useForm, FormProvider, SubmitHandler,SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchBarFormSchema } from "@/schema/SearBarForm";
import Dropdown from "@/components/SearchBarForm/DropDown";
import PersonCounter from "@/components/SearchBarForm/PersonCounter";
import DatePickerField from "@/components/SearchBarForm/DatePickerFIeld";
import { useRouter } from "next/navigation";
interface Props {
  bgColor?: string,
  isBarOpen?: boolean,
  setIsBarScaleUp?: (val:boolean)=>void
}
type FormType = z.infer<typeof searchBarFormSchema>;


export default function HeaderSearchBarForm({bgColor, isBarOpen, setIsBarScaleUp}:Props) {
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
       {
      id: "4",
      label: "嘉義",
      value: "Chayi",
    },
    {
      id: "5",
      label: "南投",
      value: "Nantou",
    },

    {
      id: "6",
      label: "屏東",
      value: "Pintung",
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
      form.reset()
      // 2. 用 router.push 帶參數跳頁
      if (setIsBarScaleUp) setIsBarScaleUp(false)
      router.push(`/event?${params.toString()}`);
    } catch(err) {
      console.warn('導向活動列表頁有誤',err)
    }
   
  };
  return (
    <div
      id="header_search_bar_form"
      className={`
        h-full
        overflow-visible 
        select-none cursor-pointer border-2 border-neutral-300 
        text-neutral-900
        rounded-full 
        ${bgColor?'':'bg-primary-50'}
      `}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit,onError)} className="flex h-full">
          <div className="form_input_wrapper flex flex-grow-1 items-center divide-x divide-primary-300">
            <div className="flex flex-col items-center justify-center bg-grey flex-grow-1 relative">
              <Dropdown options={locationOptions} fieldName="location" textCenter={true}/>
            </div>
            <div className="flex flex-col items-center  justify-center bg-grey flex-grow-1 relative">
              <PersonCounter textCenter={true}/>
            </div>
            <div className="flex flex-col items-center justify-center bg-grey flex-grow-1 relative">
              <DatePickerField placeholder='日期' textCenter={true}/>
            </div>
          </div>
          <button type="submit" className={`m-1 bg-primary-500 rounded-full flex 
          cursor-pointer justify-center items-center hover:bg-primary-300 w-11`}>
            <Icon icon='material-symbols:search' className="text-white" width={isBarOpen?25:20} height={isBarOpen?25:20} />
          </button>
        </form>
      </FormProvider>
    </div>
  );
}
