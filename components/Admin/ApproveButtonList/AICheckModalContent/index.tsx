"use client";
import Image from "next/image";
import { useAdminAICheckEvent } from "@/swr/admin/event/useAdminEvent";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface Props {
  eventId: string;
  onCloseAIModal: () => void;
}

export default function AICheckModalContent({
  eventId,
  onCloseAIModal,
}: Props) {

  const router = useRouter()  
  const [hasStarted, setHasStarted] = useState(false);
  const {
    trigger: postAiCheck,
    data: AiCheckResult,
    isMutating: isAIChecking,
  } = useAdminAICheckEvent();
  const isDone = !!AiCheckResult;

  async function handleClickStartCheck(eventId: string) {
    setHasStarted(true);
    try {
      const res = await postAiCheck({ eventId }); // 呼叫 AI 審查
      if (res.success) {
        toast.success("AI審核通過");
        router.refresh()
      } else {
        toast.success("AI審核未通過");
      }
    } catch (e) {
      console.error("審核失敗", e);
      toast.success("AI審核服務中斷");
    }
  }

  return (
    <div className="reject_content flex flex-col space-y-4">
      <p className="heading-5 text-primary-500">AI智能審核小幫手</p>
      {!hasStarted && (
        <div className="text-sm leading-relaxed space-y-3">
          <p>為加速審核工作流程，AI助手會針對單一活動內容進行以下自動審查:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>文字內容審核：</strong>
              偵測是否包含不雅詞語、不實宣傳等。
            </li>
            <li>
              <strong>圖片風險偵測：</strong>
              分析是否涉及裸露、暴力等不當內容。
            </li>
            <li>
              <strong>法規合規性：</strong>
              確認是否漏填保險資訊、聯絡方式等必要資訊。
            </li>
          </ul>
          <p>審查通過後，活動會自動上架並通知主辦方。</p>
          <p>若系統退回給出建議，會自動通知主辦方依說明補充修改。</p>
        </div>
      )}

      {isAIChecking && (
        <figure className="mx-auto">
          <Image
            width={300}
            height={300}
            alt="ai-check-loop"
            src={"/admin/check.gif"}
          />
        </figure>
      )}
      {isDone && (
        <div>
          <p>審核結果: {}</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong className="heading-5 text-neutral-950">
                文字內容審核：
              </strong>
              <p className="heading-6 text-primary-500">
                {AiCheckResult.sensitiveCheck.summary}
              </p>
            </li>
            <li>
              <strong className="heading-5 text-neutral-950">
                圖片內容審核：
              </strong>
              <p className="heading-6 text-primary-500">
                {AiCheckResult.imageRiskSummary.summary}
              </p>
            </li>
            <li>
              <strong className="heading-5 text-neutral-950">
                圖片描述審核：
              </strong>
              <p className="heading-6 text-primary-500">
                {AiCheckResult.imageCheck.summary}
              </p>
            </li>
            <li>
              <strong className="heading-5 text-neutral-950">
                法規合規性：
              </strong>
              <p className="heading-6 text-primary-500">
                {AiCheckResult.regulatoryCheck.summary}
              </p>
            </li>
          </ul>
        </div>
      )}

      <div className="flex justify-end">
        {!hasStarted && (
          <button
            className="btn-primary"
            onClick={() => handleClickStartCheck(eventId)}
          >
            <span>開始啟用</span>
          </button>
        )}
        {isDone && (
          <button className="btn-outline" onClick={onCloseAIModal}>
            <span>關閉</span>
          </button>
        )}
      </div>
    </div>
  );
}
