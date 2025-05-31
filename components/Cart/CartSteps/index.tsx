'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const steps = [
  { label: '購物車', path: '/cart' },
  { label: '填寫資料與付款', path: '/cart/checkout' },
  { label: '訂購完成', path: '/cart/complete' },
];

export default function CartSteps() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white px-[5%] md:px-[15%] py-4 border-b border-gray-200">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {steps.map((step, index) => {
          const isActive = pathname === step.path;

          return (
            <li key={step.path} className="flex items-center">
              <Link
                href={step.path}
                className={`transition heading-6 font-medium  ${
                  isActive ? 'text-black font-bold' : 'text-gray-400'
                }`}
              >
                {step.label}
              </Link>
              {index < steps.length - 1 && <span className="mx-2">{'>'}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}