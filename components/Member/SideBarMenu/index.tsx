import Link from 'next/link'
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
    <div className="menu_list">
      <ul className="menu bg-base-200 rounded-box w-full">
        {lists.map(item=> 
           <Link href={item.link} key={item.id}>
             {item.title}
           </Link>
        )}
      
      </ul>
    </div>
  );
}
