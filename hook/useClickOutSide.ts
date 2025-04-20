import { useEffect } from "react";

export default function useClickOutSide(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 點擊到元素外部執行 handler
      if (ref?.current && !ref?.current.contains(event.target as Node)) {
        handler(); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}