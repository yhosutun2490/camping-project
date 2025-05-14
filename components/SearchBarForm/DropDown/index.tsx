"use client"
import { useFormContext, useWatch } from "react-hook-form";

type Props = {
    options: {
      id: string,
      label: string,
      value: string,
    }[];
    fieldName: string,
    textCenter?: boolean
}
  
  
export default function Dropdown( {options, fieldName, textCenter}:Props) {
  const { register, setValue } = useFormContext();
  const locationValue = useWatch({ name: fieldName });

  function handleClickOnBlur(
    value: string,
  ) {
    // 先更新值
    setValue(fieldName,value)
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
  } 
  return (
    <div className="dropdown dropdown-start w-full" {...register(fieldName)}>
      <div
        tabIndex={0}
        role="button"
        className={`options w-full min-h-[30px] flex items-center ${textCenter?'justify-center':''}`}
      >
        {options.find(item=>item.value === locationValue)?.label}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu mt-5 rounded-box z-10 w-full max-w-xs bg-white shadow-sm"
      >
         {options.map((opt) => (
          <li key={opt.id} className="text-neutral-950 hover:bg-primary-50 hover:rounded-sm active:rounded-sm">
            <a 
                onClick={() => {
                    handleClickOnBlur(opt.value)
                }}
            >{opt.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
