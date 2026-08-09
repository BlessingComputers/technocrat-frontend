import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/features/auth";
import { getErrorMessage } from "@/shared/http/error-message";
import { cartService } from "../api/cart.service";
import type { AddToCartDto, Cart } from "../types";

export const cartKeys = {
  all: ["cart"] as const,
  detail: () => [...cartKeys.all, "detail"] as const,
};

/** The signed-in customer's cart. Not fetched while logged out. */
export function useCart() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: cartKeys.detail(),
    queryFn: () => cartService.getCart(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Adds an item, optimistically bumping the item count so the button and any
 * header badge react immediately, and rolling back if the write fails.
 */
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddToCartDto) => cartService.addItem(data),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.detail() });
      const previousCart = queryClient.getQueryData<Cart>(cartKeys.detail());

      if (previousCart) {
        queryClient.setQueryData<Cart>(cartKeys.detail(), {
          ...previousCart,
          itemCount: previousCart.itemCount + newItem.quantity,
        });
      }

      return { previousCart };
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData(cartKeys.detail(), updatedCart);
      toast.success("Added to cart");
    },
    onError: (error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.detail(), context.previousCart);
      }
      toast.error(getErrorMessage(error, "Could not add this to your cart."));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.detail() });
    },
  });
}
