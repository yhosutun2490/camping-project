"use client";
import DialogModal from "@/components/DialogModal";
import LoginForm from "@/components/LoginLabelModal/LoginForm";
import type { FormHandle } from "@/components/LoginLabelModal/CreateUserForm";
import { useRef, useEffect } from "react";

interface Props {
  loginLabel?: string;
}
export default function LoginLabelModal({loginLabel = '登入'}:Props) {
  const modalRef = useRef<HTMLInputElement>(null);
  const loginFromRef = useRef<FormHandle>(null);

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
          loginFromRef?.current?.resetForm()
        },200)
        
      }
    }
    modal?.addEventListener('change',handleChange)
    return ()=> modal?.removeEventListener('change',handleChange)
  })

  return (
    <>
      <label htmlFor='login' className="btn-primary btn-outline">
         {loginLabel}
      </label>
      <DialogModal id='login' modalRef={modalRef}>
         <LoginForm ref={loginFromRef} close={closeModal}/>
      </DialogModal>
    </>
  )
}
