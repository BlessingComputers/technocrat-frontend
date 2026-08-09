export interface StockSignal {
  /** Drives colour only — never a raw palette value at the call site. */
  tone: "available" | "limited" | "unavailable";
  label: string;
  /** Whether Add to cart should be offered at all. */
  canBuy: boolean;
}

/**
 * Text colour per tone, for surfaces that render the stock line as words.
 * The product card's "IN STOCK" line reads from this, so a status the backend
 * publishes but we forgot to style can never come out looking available.
 */
export const STOCK_TONE_CLASS: Record<StockSignal["tone"], string> = {
  available: "text-[#90a1b9] dark:text-muted-foreground",
  limited: "text-amber-700 dark:text-amber-400",
  unavailable: "text-destructive",
};

/** Dot colour per tone, matching the 6px status dot in the Figma card. */
export const STOCK_DOT_CLASS: Record<StockSignal["tone"], string> = {
  available: "bg-[#00bc7d]",
  limited: "bg-amber-500",
  unavailable: "bg-destructive",
};

/**
 * The customer-facing stock line, derived from `availabilityStatus`.
 *
 * Ported from blessingcomputers (`shared/utils/stock-signal.ts`) so both
 * storefronts read the same backend enum the same way. Deliberately NOT
 * computed from a raw stock count against a threshold: the threshold is an
 * internal merchandising setting and the backend has already applied it to
 * publish this enum. We show its answer.
 *
 * An unrecognised or missing status resolves to "not buyable" — the gate fails
 * closed, so a card that forgets to pass a status refuses to sell rather than
 * implying availability we cannot confirm.
 */
export function getStockSignal(
  variant: { availabilityStatus?: string | null } | null | undefined,
): StockSignal {
  switch (variant?.availabilityStatus) {
    case "IN_STOCK":
      return { tone: "available", label: "In stock", canBuy: true };
    case "LOW_STOCK":
      return { tone: "limited", label: "Only a few left", canBuy: true };
    case "PREORDER":
      return { tone: "limited", label: "Available to pre-order", canBuy: true };
    case "DISCONTINUED":
      return { tone: "unavailable", label: "No longer stocked", canBuy: false };
    case "OUT_OF_STOCK":
      return { tone: "unavailable", label: "Out of stock", canBuy: false };
    default:
      return {
        tone: "unavailable",
        label: "Availability on request",
        canBuy: false,
      };
  }
}
