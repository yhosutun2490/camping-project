import ResetPasswordTokenForm from "@/components/ResetPasswordTokenForm";
import Image from "next/image";
export default async function ResetPasswordPage() {
  return (
    <div className="reset__password__page bg-[url('/reset-password/reset-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <section className="form_wrapper w-full min-h-screen py-[100px] px-[5%] md:py-[5%] flex flex-col 
      items-center space-y-5">
        <Image className="rounded-full border-1 border-primary-300" src={'/main/about/camping.svg'} alt='logo' width={72} height={72}></Image>
        <p className="text-3xl text-white font-bold md:text-primary-500">重新設定您的密碼</p>
        <div className=" w-full md:w-[50%] max-w-[800px]">
          <ResetPasswordTokenForm />
        </div>
      </section>
    </div>
  );
}
