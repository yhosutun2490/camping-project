"use client";
import DialogModal from "@/components/DialogModal";
import CreateUserForm from "@/components/LoginLabelModal/CreateUserForm";
import type { FormHandle } from "@/components/LoginLabelModal/CreateUserForm";
import { useRef, useEffect } from "react";
export default function LoginLabelModal() {
  const modalRef = useRef<HTMLInputElement>(null);
  const createFormRef =  useRef<FormHandle>(null);
  useEffect(()=>{
    const modal = modalRef.current
    const isChecked = modal?.checked
    const handleChange = ()=>{
      if (!isChecked) {
        createFormRef?.current?.resetForm()
      }
    }
    modal?.addEventListener('change',handleChange)
    return ()=> modal?.removeEventListener('change',handleChange)
  })
  return (
    <>
      <label htmlFor="login_modal" className="btn btn-outline">
        登入
      </label>
      <DialogModal id="login_modal" modalRef={modalRef}>
        <p className="text-3xl text-base-200 text-center">
          成為~森森不息的~會員
        </p>
        <CreateUserForm ref={createFormRef} />
      </DialogModal>
    </>
  );
}
