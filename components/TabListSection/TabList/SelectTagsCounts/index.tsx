"use client";
import { useFilterStore } from "@/stores/useFilterStore";

export default function SelectTagsCounts() {
  const tags = useFilterStore((s) => s.tags);
  return (
    <p className="text-primary-300 heading-5">
      {tags.length ? `已選擇 ${tags.length} 項標籤` : ""}
    </p>
  );
}
