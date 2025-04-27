import UserInfoForm from "@/components/Member/UserInfoForm"
import ChangePasswordForm from "@/components/Member/ChangePasswordForm"
import { memberGetProfile } from "@/api/utils/member/profile"

export default async function MemberPage() {
  const memberInfo = await memberGetProfile()
  console.log("使用者info", memberInfo?.data?.member)
    return <div className="member__info__page flex flex-col gap-[2rem] overflow-y-scroll">
      <p className="text-primary-500 text-2xl">管理個人資料</p>
      <section className="form_wrapper w-full py-[1.5rem] grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserInfoForm initialProfile={memberInfo?.data?.member}/>
        <ChangePasswordForm />
      </section>
    </div>
}