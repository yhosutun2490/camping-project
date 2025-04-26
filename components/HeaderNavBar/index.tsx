import Link from "next/link"
import Image from "next/image";
import LoginLabelModal from "@/components/LoginLabelModal"
import RegisterModal from "@/components/RegisterModal";
import MemberMenu from "@/components/HeaderNavBar/MemberMenu"

interface PropsType {
  username: string
}
export default async function HeaderNavBar({username}:PropsType) {
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
      
        { username? <MemberMenu user={username}/> : 
        <div className="flex space-x-3">
           <LoginLabelModal />
           <RegisterModal />
        </div>
        }  
      </div>
    </div >

  )

}