import { redirect } from 'next/navigation'

export default function NotFound() {
  redirect('/') // 自動導回首頁
}