"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth";
import { getStockSignal } from "@/shared/utils/stock-signal";
import { useAddToCart, useCart } from "../model/use-cart";
import { LoginPromptModal } from "./login-prompt-modal";

interface AddToCartButtonProps {
  productId: string;
  variantId?: string;
  quantity?: number;
  className?: string;
  children?: React.ReactNode;
  /**
   * The backend's customer-facing stock enum for this product.
   *
   * **Required, not optional.** The control fails closed, so an optional prop
   * would turn every forgetful call site into a silent refusal to sell. A
   * caller that genuinely cannot establish stock passes `undefined` explicitly
   * and gets the safe answer; one that simply forgot gets a compile error.
   */
  availabilityStatus: string | null | undefined;
}

/**
 * Add to cart, ported from blessingcomputers so both storefronts behave the
 * same way: auth-gated (the cart hangs off the customer session), stock-gated,
 * optimistic, and once the item is in the cart the control becomes a link to
 * the cart rather than a second add.
 *
 * The unavailable state is `aria-disabled`, not `disabled`. A truly disabled
 * button drops out of the tab order, so a keyboard or screen-reader user
 * reaches the price and never learns the item is unavailable. This one still
 * takes focus and announces why it will not act.
 */
export function AddToCartButton({
  productId,
  variantId,
  quantity = 1,
  className,
  children,
  availabilityStatus,
}: AddToCartButtonProps) {
  const { isAuthenticated } = useAuth();
  const { data: cart } = useCart();
  const { mutate: addToCart, isPending } = useAddToCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [optimisticallyInCart, setOptimisticallyInCart] = useState(false);

  const isInCart = useMemo(() => {
    if (!isAuthenticated) return false;
    return Boolean(cart?.items?.some((item) => item.productId === productId));
  }, [isAuthenticated, cart, productId]);

  const inCart = isInCart || optimisticallyInCart;
  const stock = getStockSignal({ availabilityStatus });

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!stock.canBuy) return;

    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    setOptimisticallyInCart(true);
    addToCart(
      { productId, variantId, quantity },
      { onError: () => setOptimisticallyInCart(false) },
    );
  };

  // Already in the cart beats out of stock: the item is bought, and the link
  // to the cart is still the useful thing to offer.
  if (!stock.canBuy && !inCart) {
    return (
      <Button
        type="button"
        aria-disabled="true"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        variant="outline"
        // Caller classes first so the card's layout survives, inert styling
        // last so it wins the merge and the control never looks pressable.
        className={cn(
          className,
          "cursor-not-allowed border-border bg-muted text-muted-foreground shadow-none hover:bg-muted hover:text-muted-foreground",
        )}
      >
        {stock.label}
      </Button>
    );
  }

  if (inCart) {
    return (
      <Button
        asChild
        className={cn(
          className,
          "border border-[#2f7a45]/25 bg-[#e6fcec] text-[#0e2115] hover:bg-[#d7f7e1]",
        )}
      >
        <Link href="/cart" onClick={(event) => event.stopPropagation()}>
          <Icon
            icon="solar:check-circle-linear"
            aria-hidden
            className="size-6"
          />
          In cart
        </Link>
      </Button>
    );
  }

  return (
    <>
      <Button
        type="button"
        onClick={handleAdd}
        disabled={isPending}
        className={cn(
          "transition-transform active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
          className,
        )}
      >
        <Icon
          icon={isPending ? "solar:refresh-linear" : "solar:cart-3-linear"}
          aria-hidden
          className={cn("size-6", isPending && "animate-spin")}
        />
        {isPending ? "Adding" : (children ?? "Add to cart")}
      </Button>
      <LoginPromptModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </>
  );
}
