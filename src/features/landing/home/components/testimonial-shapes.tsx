/**
 * The testimonial cards are hand-drawn blobs in the Figma frame, not corner
 * radii the CSS box model can express, so the silhouettes ship as inline paths.
 *
 * Inline rather than exported <img> files for two reasons: the fill becomes a
 * `currentColor` token (the same small silhouette is both the dark card and the
 * green shadow behind it, so one path covers two exports), and
 * `preserveAspectRatio="none"` lets a single path stretch into every box the
 * design draws it in. The mobile frame scales the large card by 0.93 across and
 * 0.81 down, which is exactly that stretch — the paths are otherwise identical.
 *
 * Every shape is decorative; the card's text carries the meaning.
 */

interface ShapeProps {
  className?: string;
}

/** Side card body, and (green, offset, rotated) that same card's cast shadow. */
export function CardBlobSmall({ className }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 302 342"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M0.0588289 62.3546C3.09766 140.191 5.1173 182.597 11.6928 246.6C17.2551 271.075 23.139 281.202 42.2318 288.11C118.269 309.814 171.609 327.191 233.464 342C258.649 341.396 267.627 334.835 275.637 320.153C289.325 268.367 291.884 211.664 301.814 139.548C303.145 111.736 297.639 100.441 275.637 88.5714C195.03 54.7222 77.8607 8.46463 77.8607 8.46463C77.8607 8.46463 55.4639 -2.31187 42.2318 0.453955C26.7563 5.30694 20.0238 10.6804 11.6928 21.573C2.08153 34.4255 -0.435785 43.3624 0.0588289 62.3546Z" />
    </svg>
  );
}

/** Active card body. */
export function CardBlobLarge({ className }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 415 433"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M0 337.695L37.5199 55.5321C46.4988 34.2465 54.4995 24.4931 81.0431 13.5078C164.926 5.63801 232.871 3.95855 346.684 0C376.017 8.8112 393.61 13.5281 408.217 55.5321C411.7 169.345 415.367 250.574 414.971 324.938C413.772 357.978 406.418 371.127 380.452 384.222C223.097 413.091 136.987 428.655 63.0335 433C18.4371 419.114 0.327199 399.961 0 337.695Z" />
    </svg>
  );
}

/**
 * The green slab behind the active card. Unlike the side cards this is its own
 * squarer silhouette, so it pokes out at the top-left corner and down the right
 * edge instead of reading as a straight offset copy.
 */
export function CardBlobLargeShadow({ className }: ShapeProps) {
  return (
    <svg
      viewBox="0 0 379 378"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M45.5114 0C14.1794 7.93582 5.4727 16.4044 0 36.0747L18.0476 378H351.536C372.274 366.931 378.637 350.44 379 299.577C368.705 197.51 356.141 139.329 337.412 36.0747C327.968 21.7603 325.915 12.2025 288.762 10.9793L45.5114 0Z" />
    </svg>
  );
}
