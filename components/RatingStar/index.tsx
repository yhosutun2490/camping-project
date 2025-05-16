"use client"
type RatingStarProps = {
  rating: number;
  readOnly?: boolean;
  onChange?: (newRating: number) => void;
};

export default function RatingStar({
  rating,
  readOnly = true,
  onChange,
}: RatingStarProps) {
  return (
    <div className="rating">
      {Array.from({ length: 5 }, (_, idx) => {
        const value = idx + 1;
        const isFilled = value <= rating;
        return (
          <div
            key={value}
            role={readOnly ? undefined : 'button'}
            tabIndex={readOnly ? undefined : 0}
            aria-label={`${value} star`}
            aria-pressed={isFilled}
            className={`
              mask mask-star
              ${isFilled ? 'bg-primary-500 opacity-100' : 'bg-gray-200 opacity-80'}
              ${!readOnly ? 'cursor-pointer focus:outline-none' : ''}
            `}
            onClick={() => {
              if (!readOnly && onChange) onChange(value);
            }}
            onKeyDown={(e) => {
              if (!readOnly && onChange && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onChange(value);
              }
            }}
          />
        );
      })}
    </div>
  );
}