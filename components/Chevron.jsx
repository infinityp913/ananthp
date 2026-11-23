// Disclosure chevron: points right when closed, down when open.
export function Chevron({ open = false, className = "" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none ${
        open ? "rotate-90" : ""
      } ${className}`}
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}
