function StarIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function StarRating({ rating }) {
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - filled - (hasHalf ? 1 : 0);

  const label = `${rating} out of 5 stars`;

  return (
    <span role="img" aria-label={label} className="flex items-center gap-0.5 flex-shrink-0">
      <span className="sr-only">{label}</span>

      {Array.from({ length: filled }).map((_, i) => (
        <StarIcon key={`filled-${i}`} className="w-3.5 h-3.5 text-amber-400" />
      ))}

      {hasHalf && (
        <span
          data-half="true"
          className="relative w-3.5 h-3.5 flex-shrink-0 inline-flex"
          aria-hidden="true"
        >
          <StarIcon className="absolute inset-0 w-3.5 h-3.5 text-neutral-700" />
          <span className="overflow-hidden w-[50%] absolute inset-0">
            <StarIcon className="w-3.5 h-3.5 text-amber-400" data-half />
          </span>
        </span>
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <StarIcon key={`empty-${i}`} className="w-3.5 h-3.5 text-neutral-700" />
      ))}
    </span>
  );
}
