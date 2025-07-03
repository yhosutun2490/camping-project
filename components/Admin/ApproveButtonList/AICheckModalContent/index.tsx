"use client";
import Image from "next/image";
import clsx from "clsx";
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
      } else {
        toast.error("AI審核未通過");
      }
    } catch (e) {
      console.error("審核失敗", e);
      toast.error("AI審核服務中斷，請洽服務人員");
      setHasStarted(false);
    }
  }
  
  function handleClickClose() {
    onCloseAIModal()
    router.refresh()
  }
  return (
    <div className="reject_content flex flex-col space-y-4">
      <p className="heading-5 text-primary-500">AI智能審核小幫手</p>
      {!hasStarted && (
        <div className="text-sm leading-relaxed space-y-3 text-neutral-950">
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
          <div className="space-x-1 text-neutral-950">審核結果: 
            <span className={clsx(AiCheckResult.success? 'text-primary-500': 'text-red-500')}>
                {AiCheckResult.success? "通過":"未通過"}
            </span>
          </div>
          <ul className="list-disc list-inside space-y-2">
            <li className="space-y-1">
              <strong className="heading-5 text-neutral-950">
                文字內容審核：
              </strong>
              <p className={clsx("heading-6",
                AiCheckResult.sensitiveCheck.hasSensitiveContent?'text-red-500': 'text-primary-500' 
                )}>
                {AiCheckResult.sensitiveCheck.summary}
              </p>
            </li>
            <li className="space-y-1">
              <strong className="heading-5 text-neutral-950">
                圖片內容審核：
              </strong>
              <p className={clsx("heading-6",
                AiCheckResult.imageRiskSummary.hasRisk?'text-red-500': 'text-primary-500' 
                )}>
                {AiCheckResult.imageRiskSummary.summary}
              </p>
            </li>
            <li className="space-y-1">
              <strong className="heading-5 text-neutral-950">
                圖片描述審核：
              </strong>
              <p className={clsx("heading-6",
                AiCheckResult.imageCheck.hasIssue?'text-red-500': 'text-primary-500' 
                )}>
                {AiCheckResult.imageCheck.summary}
              </p>
            </li>
            <li className="space-y-1">
              <strong className="heading-5 text-neutral-950">
                法規合規性：
              </strong>
              <p className={clsx("heading-6",
                AiCheckResult.regulatoryCheck.hasRegulatoryIssues?'text-red-500': 'text-primary-500' 
                )}>
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
          <button className="btn-primary" onClick={handleClickClose}>
            <span>關閉</span>
          </button>
        )}
      </div>
    </div>
  );
}
