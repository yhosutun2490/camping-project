"use client"
import Link from 'next/link'
import { Icon } from "@iconify/react";
type Props = {
  lists: {
    id: string;
    link: string;
    title: string;
    icon: string;
  }[];
};

export default function SideBarMenu({ lists }: Props) {
  return (
    <div className="menu_list text-neutral-500">
      <ul className="menu rounded-box w-full flex flex-col 2xl:gap-4">
        {lists.map(item=> 
           <button key={item.id} className='w-full h-[45px] hover:bg-primary-100 rounded-lg px-4 py-2'>
              <Link href={item.link}  className='flex items-center space-x-2'>
             <Icon icon={item.icon} width={20} height={20} className='text-neutral-500'/>
             <p className='text-sm'>{item.title}</p>
           </Link>
           </button>
         
        )}
      </ul>
    </div>
  );
}
