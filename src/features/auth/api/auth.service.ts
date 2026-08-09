import { api } from "@/shared/http/api";
import { API_ENDPOINTS } from "@/config/api-config";
import type { CustomerProfile } from "../types";

// Endpoint paths and response envelope ported from blessingcomputers (same
// backend for now — see docs/koyeb-shared-backend.md).
export const authService = {
  getCustomerProfile: async (): Promise<CustomerProfile> => {
    const res = await api.get<{ data: CustomerProfile }>(
      API_ENDPOINTS.user.me,
    );
    return res.data.data;
  },
  logout: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.user.logout);
  },
  logoutAll: async (): Promise<void> => {
    await api.post(API_ENDPOINTS.user.logoutAll);
  },
};
