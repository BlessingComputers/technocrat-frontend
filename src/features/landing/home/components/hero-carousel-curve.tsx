/**
 * Two background-colored ellipses laid over the carousel's top and bottom
 * edges. Centered on the row and wider than it, they touch the row edge at
 * full width but dip deepest into the row at the horizontal middle — the
 * pair reads as a convex lens biting into the strip from both sides.
 *
 * Kept shallow on purpose: the bottom one sits right above each card's
 * category badge (`inset-x-4 bottom-4`), so it must stay well short of that
 * zone or it paints the badge over in background color.
 */
export function HeroCarouselCurve() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-10 overflow-hidden"
    >
      <div
        className="absolute left-1/2 top-0 w-[120%] -translate-x-1/2 -translate-y-[82%] rounded-[50%] bg-background"
        style={{ aspectRatio: "1440 / 90" }}
      />
      <div
        className="absolute left-1/2 bottom-0 w-[120%] -translate-x-1/2 translate-y-[85%] rounded-[50%] bg-background"
        style={{ aspectRatio: "1440 / 100" }}
      />
    </div>
  );
}
