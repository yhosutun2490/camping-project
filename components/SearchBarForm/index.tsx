"use client";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { searchBarFormSchema } from "@/schema/SearBarForm";
import Dropdown from "./DropDown";
import PersonCounter from "./PersonCounter";
// import DatePickerField from "@/components/DatePickerFIeld";

type FormType = z.infer<typeof searchBarFormSchema>;

export default function SearchBarForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(searchBarFormSchema),
    shouldUnregister: true,
    defaultValues: {
      location: '',
      price: 0,
      person: {
        adults: 0,
        children: 0,
        pets: 0
      },
      dateRange: { from: undefined, to: undefined },
    },
  });

  //   const dateRange = useWatch({
  //     control: form.control,
  //     name: "dateRange",
  //   }); // 型別是 { from?: Date; to?: Date }

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
      className="w-full px-[24px] py-[12px] overflow-visible select-none cursor-pointer
    bg-white/40 backdrop-blur-sm border-2 border-neutral-300 rounded-full"
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
          <div className="form_input_wrapper flex flex-grow-1 gap-4 items-center divide-x divide-white/30">
            <div className="flex flex-col bg-grey grow-1 relative">
              <p>地點</p>
              <Dropdown options={locationOptions} fieldName="location"/>
            </div>
            <div className="flex flex-col bg-grey grow-1 relative">
              <p>人數</p>
              <PersonCounter />
            </div>
            <div className="flex flex-col bg-grey grow-1 relative">
              <p>日期</p>
            </div>
          </div>
          <button className="bg-primary-500 rounded-full w-[3rem] h-[3rem]"></button>
        </form>
      </FormProvider>
    </div>
  );
}
