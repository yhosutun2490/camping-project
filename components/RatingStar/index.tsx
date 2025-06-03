"use client"
import clsx from "clsx";
type RatingStarProps = {
  rating: number;
  readOnly?: boolean;
  ratingSizeClass?: string;
  starColor?: string; // Tailwind CSS class for star color
  starSize?: string
  onChange?: (newRating: number) => void;
};

export default function RatingStar({
  rating,
  readOnly = true,
  ratingSizeClass,
  starColor = 'bg-primary-500',
  starSize,
  onChange,
}: RatingStarProps) {
  return (
    <div className={clsx('rating',ratingSizeClass)}>
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
              mask mask-star-2 mr-1
              ${isFilled ? clsx(starColor,'opacity-100') : 'bg-gray-400 opacity-60'}
              ${!readOnly ? 'cursor-pointer focus:outline-none' : ''}
              ${starSize}
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