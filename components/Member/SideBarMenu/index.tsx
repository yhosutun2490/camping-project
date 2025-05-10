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
    <div className="menu_list bg-primary-50 text-neutral-950 px-[5%]">
      <ul className="menu rounded-box w-full flex flex-col">
        {lists.map(item=> 
           <button key={item.id} className='w-full hover:bg-primary-100 rounded-lg px-4 py-2'>
              <Link href={item.link}  className='flex items-center space-x-2'>
             <Icon icon={item.icon} width={28} height={28} />
             <p className='text-2xl'>{item.title}</p>
           </Link>
           </button>
         
        )}
      </ul>
    </div>
  );
}
