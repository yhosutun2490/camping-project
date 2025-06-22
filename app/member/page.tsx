import UserInfoForm from "@/components/Member/UserInfoForm"
import ChangePasswordForm from "@/components/Member/ResetPasswordForm"
import { memberGetProfile } from "@/api/server-components/member/profile"

export const metadata = {
  title: "會員資料 | 森森不息",
  description: "在這裡您可以查看和修改您的會員資料",
}

export default async function MemberPage() {
  const memberInfo = await memberGetProfile()
  return <div className="member__info__page flex flex-col gap-[1rem]">
    <section className="form_wrapper w-full grid grid-cols-1  gap-8">
      <UserInfoForm initialProfile={memberInfo?.data?.member} />
      <ChangePasswordForm />
    </section>
  </div>
}