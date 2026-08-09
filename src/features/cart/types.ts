/**
 * Cart shapes for the shared backend (see docs/koyeb-shared-backend.md).
 * Ported from blessingcomputers' `features/cart/types.ts`, trimmed to the
 * fields this app reads today — checkout/tax fields land with the cart page.
 */

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantName: string;
  sku: string;
  imageUrl: string;
  unitPrice: number;
  compareAtPrice: number | null;
  quantity: number;
  lineTotal: number;
  availabilityStatus: string;
  stockQuantity: number;
}

export interface Cart {
  id: string;
  sessionId: string;
  customerId: string | null;
  items: CartItem[];
  itemCount: number;
  uniqueItemCount: number;
  subtotalAmount: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartDto {
  variantId?: string;
  productId?: string;
  quantity: number;
}
