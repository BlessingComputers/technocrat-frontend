import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/http/error-message";
import { authService } from "../api/auth.service";
import { authKeys } from "./auth-queries";

export type LogoutScope = "device" | "all";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (scope: LogoutScope = "device") =>
      scope === "all" ? authService.logoutAll() : authService.logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.customerProfile() });
      window.location.href = "/account";
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to log out"));
    },
  });
}
