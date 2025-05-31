'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import clsx from 'clsx';

export default function LayoutContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    container?.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]); // 每次切換頁面時觸發

  return (
    <main
      id="main-scroll-container"
      className={clsx(
        'flex-1 h-full overflow-x-hidden overflow-y-auto',
        isHome ? 'pt-0' : 'pt-[120px] md:pt-[80px]'
      )}
    >
      {children}
    </main>
  );
}