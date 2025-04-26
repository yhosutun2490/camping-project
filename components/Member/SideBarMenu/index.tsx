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
    <div className="menu_list bg-primary-50 text-neutral-950 h-full px-[15%]">
      <ul className="menu rounded-box w-full flex flex-col space-y-6">
        {lists.map(item=> 
           <Link href={item.link} key={item.id} className='flex items-center space-x-2'>
             <Icon icon={item.icon} width={28} height={28} />
             <p className='text-2xl'>{item.title}</p>
           </Link>
        )}
      
      </ul>
    </div>
  );
}
