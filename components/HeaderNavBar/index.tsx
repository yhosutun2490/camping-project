import Link from "next/link"
import LoginLabelModal from "@/components/LoginLabelModal"
import MemberMenu from "@/components/HeaderNavBar/MemberMenu"
import { UserRole } from "@/types/page/main/user"

interface PropsType {
  user: UserRole | null
}
export default async function HeaderNavBar({user}:PropsType) {
  return (
    < div className="navbar bg-primary shadow-sm px-[5%]" >
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">森森不息</a>
      </div>
      <div className="flex item-center space-x-4">
        <Link href="/">
          <button className="btn btn-outline">活動列表</button>
        </Link>
        <Link href="/event">
          <button className="btn btn-outline">辦活動</button>
        </Link>
      
        { user? <MemberMenu user={user}/> : <LoginLabelModal />} 
      </div>
    </div >

  )

}