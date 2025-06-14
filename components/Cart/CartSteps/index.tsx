'use client';

import { usePathname } from 'next/navigation';

const steps = [
  { label: '購物車', path: '/cart' },
  { label: '填寫資料與付款', path: '/cart/checkout' },
  { label: '報名完成', path: '/payment-success' },
];

export default function CartSteps() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white px-[5%] md:px-[15%] py-4 border-b border-gray-200">
      <ol className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-500">
        {steps.map((step, index) => {
          const isActive = pathname.includes(step.path);

          return (
            <li key={step.path} className="flex items-center">
              <div
                className={`transition heading-5  ${
                  isActive ? 'text-black font-bold' : 'text-gray-400'
                }`}
              >
                {step.label}
              </div>
              {index < steps.length - 1 && <span className="mx-2">{'>'}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}