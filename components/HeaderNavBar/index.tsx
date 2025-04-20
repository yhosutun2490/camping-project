import Link from "next/link"
import Image from "next/image";
import LoginLabelModal from "@/components/LoginLabelModal"
import MemberMenu from "@/components/HeaderNavBar/MemberMenu"
import { UserRole } from "@/types/page/main/user"

interface PropsType {
  user: UserRole | null
}
export default async function HeaderNavBar({user}:PropsType) {
  return (
    < div className="navbar fixed top-0 left-0 w-full px-[16%]" >
      <div className="flex flex-1 items-center">
        <Image src='/header/logo_icon.svg'
            width={35}
            height={35}
            alt="Logo"
            className="cursor-pointer"
        />
        <a className="text-neutral-950 text-base ml-[0.5rem]">森森不息</a>
      </div>
      <div className="flex item-center space-x-4 h-full">
        <Link href="/" className="flex items-center">
          <p className="text-neutral-950 text-base">活動列表</p>
        </Link>
        <Link href="/event" className="flex items-center">
          <p className="text-neutral-950 text-base">辦活動</p>
        </Link>
      
        { user? <MemberMenu user={user}/> : <LoginLabelModal />} 
      </div>
    </div >

  )

}