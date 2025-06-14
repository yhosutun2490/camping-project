"use client";
import DialogModal from "@/components/DialogModal";
// 刪除會員訂單流程api
import { useDeleteMemberOrders } from "@/swr/member/orders/useMemberOrders";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  modalId: string;
  modalRef: React.RefObject<HTMLInputElement | null>;
  itemCounts: number;
  orderIds: string[];
}
export default function DeleteCartItemModal({
  modalId,
  modalRef,
  itemCounts,
  orderIds,
}: Props) {
  const { trigger: deleteOrders, isMutating } = useDeleteMemberOrders();
  const router = useRouter();
  /** 刪除並關閉 modal */
  async function handleDeleteConfirm() {
    try {
      // 單筆或批次刪除
      for (const orderId of orderIds) {
        await deleteOrders({ id: orderId }); // 依你的 hook 參數自行調整
      }
      toast.success("成功刪除購物車品項");
      // 關閉 modal（checkbox 失焦）
      router.refresh()
      if (modalRef.current) modalRef.current.checked = false;
    } catch (err) {
      console.error(err);
      toast.error("刪除失敗，請稍後再試");
    }
  }

  return (
    <DialogModal id={modalId} modalRef={modalRef} modalWidth="max-w-md">
      <h3 className="font-bold heading-5 text-primary-500">
        共計 <span className="text-neutral-700">{itemCounts}</span>{" "}
        項商品，確定刪除?
      </h3>
      <div className="modal-action">
        <button
          onClick={handleDeleteConfirm}
          disabled={isMutating}
          className="btn-primary"
        >
            {isMutating ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "確定"
          )}
        </button>
      </div>
    </DialogModal>
  );
}
