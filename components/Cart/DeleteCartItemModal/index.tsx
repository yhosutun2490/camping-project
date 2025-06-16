"use client";
import DialogModal from "@/components/DialogModal";
// 刪除會員訂單流程api
import { useDeleteMemberOrders } from "@/swr/member/orders/useMemberOrders";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { Order } from "@/components/Cart/CartItem";

interface Props {
  modalId: string;
  modalRef: React.RefObject<HTMLInputElement | null>;
  itemCounts: number;
  orderIds: string[];
  setSelectedOrders?: React.Dispatch<React.SetStateAction<Order[]>>
}
export default function DeleteCartItemModal({
  modalId,
  modalRef,
  itemCounts,
  orderIds,
  setSelectedOrders
}: Props) {
  const { trigger: deleteOrders, isMutating } = useDeleteMemberOrders();
  const router = useRouter();
  /** 刪除並關閉 modal */
  async function handleDeleteConfirm() {
    if (!orderIds.length) {
      if (modalRef.current) modalRef.current.checked = false;
      return
    }
    try {
      // 單筆或批次刪除
      for (const orderId of orderIds) {
        await deleteOrders({ id: orderId }); // 依你的 hook 參數自行調整
      }
      toast.success("成功刪除購物車品項");
      // 關閉 modal（checkbox 失焦）
      router.refresh()
      if (modalRef.current) modalRef.current.checked = false;
      // 購物車選項狀態清空
      if (setSelectedOrders) setSelectedOrders([]);
    } catch (err) {
      console.error(err);
      toast.error("刪除失敗，請稍後再試");
    }
  }

  return (
    <DialogModal id={modalId} modalRef={modalRef} modalWidth="max-w-md">
      <div className="font-bold heading-5 text-primary-500">
        {orderIds.length ?
          <div className="delete_text">
            共計 <span className="text-neutral-700">{itemCounts}</span>{" "}
            項商品，確定刪除?
          </div> : <p>請先選擇刪除品項</p>
        }


      </div>
      <div className="modal-action">
        <button
          onClick={handleDeleteConfirm}
          disabled={isMutating}
          className={clsx("btn-primary")}
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
