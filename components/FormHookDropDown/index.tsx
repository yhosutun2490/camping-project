"use client"
import { Icon } from "@iconify/react";
type Props = {
  value?: string ; // React Hook Form props
  onChange: (v: string) => void; // React Hook Form props
  options: {
    id: string,
    label: string,
    value: string,
  }[];
  placeholder?: string;
  label: string
};

export default function FormHookDropDown({
  value,
  onChange,
  options,
  placeholder = "請選擇",
  label
}: Props) {

    function handleClickOnBlur(
        e: React.MouseEvent<HTMLAnchorElement>,
        value: string,
        onChange: (v: string) => void
      ) {
        // 先更新值
        onChange(value);
        const active = document.activeElement;
        if (active instanceof HTMLElement) {
          active.blur();
        }
      } 
  return (
    <div className="dropdown inline-block dropdown-center flex flex-col">
      <label htmlFor="gender" className="label text-neutral-950 mb-1">{label}</label>
      <div className="btn btn-outline border-none bg-stone-300 text-neutral-950 w-full mb-2 flex justify-between" tabIndex={0} role="button">
        {options.find(item=>item.value === value)?.label || placeholder}
        <Icon icon='mdi:triangle-down' width={14} height={14} />
      </div>
      <ul
        className="dropdown-content w-full menu 
        text-neutral-950 bg-primary-50 rounded-box z-10 p-2 shadow-sm"
        tabIndex={0}
      >
        {options.map((opt) => (
          <li key={opt.id} className="hover:bg-gray-200 hover:rounded-sm">
            <a 
                onClick={(e) => {
                    handleClickOnBlur(e,opt.value,onChange)
                }}
            >{opt.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
