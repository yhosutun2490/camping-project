
type Props = {
    rate: string
}
export default function DiscountRate({rate}:Props) {
  return (
    <div className="inline-block bg-red-100 text-red-500 rounded-xl px-3 py-1 font-bold text-base relative">
      <div
        className="before:content-[''] before:absolute before:left-[-4px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-3 before:rounded-full before:bg-white
                  after:content-[''] after:absolute after:right-[-4px] after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-3 after:rounded-full after:bg-white"
      >
        {rate} 折
      </div>
    </div>
  );
}
