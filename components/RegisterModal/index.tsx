"use client";
import DialogModal from "@/components/DialogModal";
import CreateUserForm from "@/components/LoginLabelModal/CreateUserForm";
import type { FormHandle } from "@/components/LoginLabelModal/CreateUserForm";
import { useRef, useEffect} from "react";


export default function RegisterModal() {
  const modalRef = useRef<HTMLInputElement>(null);
  const createFormRef = useRef<FormHandle>(null);

  function closeModal():void {
    if (modalRef.current) {
      modalRef.current.checked = false; // 關閉 modal
    }
  }
  useEffect(()=>{
    const modal = modalRef.current
    const handleChange = ()=>{
      const isChecked = modal?.checked
      if (!isChecked) {
        setTimeout(()=>{
          createFormRef?.current?.resetForm()
        },200)
        
      }
    }
    modal?.addEventListener('change',handleChange)
    return ()=> modal?.removeEventListener('change',handleChange)
  })

  return (
    <>
      <label htmlFor='modal-register' className="btn-primary btn-outline">
         註冊
      </label>
      <DialogModal id='modal-register' modalRef={modalRef}>
        <p className="text-3xl text-primary-500 text-center">
          成為~森森不息的~會員
        </p>
         <CreateUserForm ref={createFormRef} close={closeModal}/>
      </DialogModal>
    </>
  );
}
