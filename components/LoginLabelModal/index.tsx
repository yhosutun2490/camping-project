"use client";
import DialogModal from "@/components/DialogModal";
import CreateUserForm from "@/components/LoginLabelModal/CreateUserForm";
import LoginForm from "@/components/LoginLabelModal/LoginForm";
import type { FormHandle } from "@/components/LoginLabelModal/CreateUserForm";
import { useRef, useEffect, useState } from "react";

type StepType = 'createUser' | 'login';

export default function LoginLabelModal() {
  const [step, setStep] = useState<StepType>('createUser')
  const modalRef = useRef<HTMLInputElement>(null);
  const createFormRef =  useRef<FormHandle>(null);
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
          createFormRef?.current?.resetForm()
          setStep('createUser')
        },200)
        
      }
    }
    modal?.addEventListener('change',handleChange)
    return ()=> modal?.removeEventListener('change',handleChange)
  })
  return (
    <>
      <label htmlFor="login_modal" className="btn-primary btn-outline">
        登入
      </label>
      <DialogModal id="login_modal" modalRef={modalRef}>
        <p className="text-3xl text-base-200 text-center">
          {step === 'createUser'? '成為~森森不息的~會員': '登入'}
        </p>
        { step === 'createUser'?
         <CreateUserForm ref={createFormRef} close={closeModal}/>: 
         <LoginForm ref={loginFromRef} close={closeModal}/>
        }
        <div className="divider divider-neutral"></div>
        { step === 'createUser'?
        <div className="flex justify-between">
          <span className="text-2xl text-gray-500">已經是森森不息會員?</span>
          <button className='btn-primary' onClick={()=>setStep('login')}>登入</button>
        </div>
         :  
        <div className="flex justify-between">
          <span className="text-2xl text-gray-500">還不是森森不息會員?</span>
          <button className='btn-primary'  onClick={()=>setStep('createUser')}>註冊</button>
        </div>
      
        }
      </DialogModal>
    </>
  );
}
