
type Props = {
    rate: string
}
export default function DiscountRate({ rate }: Props) {
  return (
    <div className="relative inline-block bg-red-100 text-red-500 rounded-xl pl-4 pr-4 py-1 font-bold text-base">
      {`${rate} 折`}

      {/* 左圓點 */}
      <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-3 rounded-full bg-white" />

      {/* 右圓點 */}
      <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-3 rounded-full bg-white" />
    </div>
  );
}