import { useQuery } from "@tanstack/react-query";
import { authService } from "../api/auth.service";

export const authKeys = {
  all: ["auth"] as const,
  customerProfile: () => [...authKeys.all, "customerProfile"] as const,
};

/**
 * Returns true if the browser has a customer auth cookie.
 * Used to avoid firing /auth/customer/me for anonymous visitors.
 */
function hasCustomerCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => {
    const trimmed = c.trim();
    return (
      trimmed.startsWith("customerAccessToken=") ||
      trimmed.startsWith("customerRefreshToken=") ||
      trimmed.startsWith("hasCustomerSession=")
    );
  });
}

export function useCustomerProfileQuery() {
  return useQuery({
    queryKey: authKeys.customerProfile(),
    queryFn: () => authService.getCustomerProfile(),
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: hasCustomerCookie(),
  });
}
