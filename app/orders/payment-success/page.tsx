"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemberLogin } from "@/stores/useMemberLogin";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const memberInfo = useMemberLogin((state) => state.member);
  const tradeNo = searchParams.get("MerchantTradeNo");
  const maskMemberEmail = maskEmail(memberInfo.email)

  if (!tradeNo) {
    router.push('/')
  }

  function maskEmail(email: string): string {
    const [local, domain] = email.split("@");
    if (local.length <= 4) return `${local[0]}***@${domain}`;
    return `${local.slice(0, 4)}****@${domain}`;
  }

  return (
    <div className="flex flex-col items-center p-20 justify-center text-center m-auto">
      <div className="text-green-600 text-5xl mb-4">✔</div>
      <h1 className="text-2xl font-bold mb-2 text-neutral-800">
        謝謝您！您的活動報名已經成功！
      </h1>
      <p className="mb-1 heading-5 text-primary-500">
        付款訂單號碼
        <span className="heading-5">{tradeNo}</span>
      </p>
      <p className="text-neutral-600 mb-6">
        訂單確認電郵已經發送到您的電子郵箱：
        <br />
        <span className="font-semibold">{maskMemberEmail}</span>
      </p>

      <div className="flex gap-4">
        <button onClick={() => router.push("/")} className="btn-primary">
          回首頁
        </button>
        <button
          onClick={() => router.push("/member/tickets")}
          className="cursor-pointer px-5 py-2 rounded-xl border border-primary-500 text-primary-500 hover:bg-primary-300 transition"
        >
          查看票卷和訂單
        </button>
      </div>
    </div>
  );
}
