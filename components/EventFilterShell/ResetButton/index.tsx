"use client"
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/stores/useFilterStore";
export default function RestButton() {
  const router = useRouter()
  const setTags = useFilterStore(s=>s.setTags)

  function handleReset () {
    router.push('event')
    setTags([])
  }
  return (
    <div
      className="text-base px-4 py-1 h-full bg-primary-300 text-white
              ml-5 border-1 border-primary-300 rounded-full hover:bg-gray-300 hover:cursor-pointer"
      onClick={handleReset}
    >
      清除所有條件
    </div>
  );
}
