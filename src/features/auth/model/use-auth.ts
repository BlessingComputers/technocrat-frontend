import { useCustomerProfileQuery } from "./auth-queries";

export function useAuth() {
  const { data: user, isLoading, isError, refetch } = useCustomerProfileQuery();

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
    refetchUser: refetch,
  };
}
