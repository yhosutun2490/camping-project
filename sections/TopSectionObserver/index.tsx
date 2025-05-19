"use client";
import { useEffect, useRef } from "react";
import { useTopIntersectStore } from "@/stores/topIntersectStore"

export default function TopSectionObserver({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const setTopVisible = useTopIntersectStore((s) => s.setTopVisible);

  useEffect(() => {
    if (!ref.current) return;
    // 進入結束超過域值都會觸發
    const obs = new IntersectionObserver(
      ([e]) => setTopVisible(e.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [setTopVisible]);

  return <div ref={ref}>{children}</div>;
}