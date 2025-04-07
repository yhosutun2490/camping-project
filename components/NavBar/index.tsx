'use client'
import Link from "next/link"
import DialogModal from "@/components/DialogModal"
import { useState } from "react"
export default function NavBar() {
  if (true) {
    const [name, setName] = useState('')
  }
  return (
    < div className="navbar bg-base-100 shadow-sm" >
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">森森不息</a>
      </div>
      <div className="flex-none space-x-4">
        <Link href="/">
          <button className="btn btn-outline">活動列表</button>
        </Link>
        <Link href="/event">
          <button className="btn btn-outline">辦活動</button>
        </Link>
        <label
          htmlFor="login_modal"
          className="btn btn-outline"
        >
          登入
        </label>
        <DialogModal id="login_modal">
          <div className="flex">
            <input type="input" className="input validator" required placeholder="Username" />
            <p className="validator-hint">
              Must be 3 to 30 characters
              <br />containing only letters, numbers or dash
            </p>
            <label htmlFor="login_modal" className="btn rounded-full">X</label>
          </div>
        </DialogModal>

      </div>
    </div >

  )

}