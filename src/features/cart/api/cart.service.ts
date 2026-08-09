import { api } from "@/shared/http/api";
import { API_ENDPOINTS } from "@/config/api-config";
import type { Cart, AddToCartDto } from "../types";

/**
 * Cart service against the shared backend. Responses are `{ success, data }`,
 * so unwrap `.data` here — the http client does not peel envelopes.
 *
 * Only the reads/writes the storefront needs today. Remove/update/validate
 * exist on the backend and get ported when the cart page is built.
 */
export const cartService = {
  /** Fetches the current session's cart. The server creates one if absent. */
  getCart: async (): Promise<Cart> => {
    const response = await api.get(API_ENDPOINTS.cart.base);
    return response.data?.data;
  },

  /** Adds an item; an item already in the cart has its quantity increased. */
  addItem: async (data: AddToCartDto): Promise<Cart> => {
    const response = await api.post(API_ENDPOINTS.cart.items, data);
    return response.data?.data;
  },
};
