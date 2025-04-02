"use client"
import { useState } from 'react'


export default function ActivityPage() {
  const [acivtity, setAtivity] = useState('123')
  return (
    <div>
      活動列表頁 {acivtity}
      <label htmlFor="">輸入活動</label>
      <input type="text" onChange={(e) => { setAtivity(e.target.value) }} />
    </div>
  )
}