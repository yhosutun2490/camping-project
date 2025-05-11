// components/TabListClientWrapper.tsx
'use client'

import dynamic from 'next/dynamic'

// 這裡可以安全地關掉 SSR，讓 TabListSection 只在瀏覽器載入
const TabListSection = dynamic(
  () => import('@/components/TabListSection'),
  { ssr: false }
)

export default function TabListClientWrapper() {
  return <TabListSection />
}