import UserInfoForm from "@/components/Member/UserInfoForm"
import ChangePasswordForm from "@/components/Member/ResetPasswordForm"
import { memberGetProfile } from "@/api/server-components/member/profile"

export default async function MemberPage() {
  const memberInfo = await memberGetProfile()
  return <div className="member__info__page flex flex-col gap-[1rem]">
    <section className="form_wrapper w-full py-[1rem] grid grid-cols-1  gap-8">
      <UserInfoForm initialProfile={memberInfo?.data?.member} />
      <ChangePasswordForm />
    </section>
  </div>
}