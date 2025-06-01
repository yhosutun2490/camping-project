"use client"
export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-neutral-500">
      <div className="w-24 h-24 mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
        {/* 替代圖片或 Icon */}
        <span className="heading-3">森</span>
      </div>
      <p className="mb-4 text-lg font-medium">您的購物車是空的</p>
      <button className="cursor-pointer bg-primary-500 hover:bg-primary-300 text-white font-semibold py-2 px-6 rounded">
        跟著森森不息一起探索露營
      </button>
    </div>
  );
}