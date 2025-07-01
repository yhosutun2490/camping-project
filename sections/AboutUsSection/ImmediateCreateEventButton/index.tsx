"use client"
import { useRouter } from "next/navigation";
import { useMemberLogin } from "@/stores/useMemberLogin";
import CreateHostModalAbout from "./CreateHostModalAbout";

export default function ImmediateCreateEventButton() {
  const router = useRouter();
  const member = useMemberLogin((state) => state.member); // ✅ 這樣才有 reactive tracking

  const isLogin = !!member?.role;
  const isHost = member?.role === "host";

  function handleClickToCreateActivityPage() {
    router.push('/create-activity')
  }

  return (
    <>
      {isLogin ? (
        isHost ? (
         <button 
           className="btn-primary mx-auto"
           onClick={handleClickToCreateActivityPage}
        >立即發起活動</button>
        ) : (
          <CreateHostModalAbout/>
        )
      ) : 
        <label
          htmlFor="login"
          className="btn-primary mx-auto"
        >
          立刻登入發起活動
        </label>}
    </>
  );
}