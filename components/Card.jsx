const base = "block rounded-xl border border-neutral-800 bg-neutral-900/40 p-5";
const hover =
  "transition-colors hover:border-neutral-700 hover:bg-neutral-900/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-neutral-500";

// Shared card surface. Use `interactive` when the whole card is a link.
export function Card({
  as: Tag = "div",
  interactive = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`${base} ${interactive ? hover : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
