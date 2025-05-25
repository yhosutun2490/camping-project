'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function LayoutContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main
      className={clsx(
        'flex-1 h-full',
        isHome ? 'pt-0' : 'pt-[120px] md:pt-[80px]'
      )}
    >
      {children}
    </main>
  );
}