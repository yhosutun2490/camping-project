export default function PriceRangeFilter() {
  return (
    <div className="price_range_filter">
      <p>價格範圍</p>
      <input
        type="range"
        min={0}
        max="100"
        value="40"
        className="range text-blue-300 [--range-bg:orange] [--range-thumb:blue] [--range-fill:0]"
      />
      <div className="flex">
        <p>NT$</p>
        <input type="number" />
      </div>
      <div>
        <p>NT$</p>
        <input type="number" />
      </div>
    </div>
  );
}
