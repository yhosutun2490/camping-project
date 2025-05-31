interface CartItemProps {
  title: string;
  date: string;
  type: string;
  option: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export default function CartItem({
  title,
  date,
  type,
  option,
  quantity,
  price,
  imageUrl,
}: CartItemProps) {
  return (
    <div className="flex items-start border-b py-4">
      {/* Checkbox + Image */}
      <div className="flex-shrink-0 mr-4 mt-1">
        <input type="checkbox" checked readOnly className="accent-primary" />
      </div>
      <img
        src={imageUrl}
        alt={title}
        className="w-24 h-16 object-cover rounded-md mr-4"
      />

      {/* Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-base text-neutral-800">{title}</p>
            <p className="text-sm text-neutral-500 mt-1">{date}</p>
            <p className="text-sm text-neutral-500">{`[${type}] ${option}`}</p>
          </div>
          <p className="text-sm text-neutral-500">張 x {quantity}</p>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-col items-end justify-between ml-4 h-full">
        <p className="font-bold text-black whitespace-nowrap">NT${price.toLocaleString()}</p>
        <div className="flex space-x-2 text-gray-400 mt-2 text-xl">
          <button title="收藏">
            <i className="icon-[material-symbols--favorite-border]" />
          </button>
          <button title="刪除">
            <i className="icon-[material-symbols--delete-outline]" />
          </button>
        </div>
      </div>
    </div>
  );
}