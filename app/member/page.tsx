import UserInfoForm from "@/components/Member/UserInfoForm"

export default function MemberPage() {
    return <div className="member__info__page flex flex-col gap-[2rem]">
      <p className="text-primary-500 text-2xl">會員個人資料</p>
      <section className="form_wrapper w-full py-[1.5rem] grid grid-cols-2">
        <UserInfoForm />
      </section>
    </div>
}