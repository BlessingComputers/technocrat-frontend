/**
 * Shape ported from blessingcomputers' features/auth/types.ts — same backend
 * for now, see docs/koyeb-shared-backend.md. Revisit once Technocrat's own
 * backend clone defines its own customer profile shape.
 */
export interface CustomerAddress {
  id: string;
  addressId: string;
  type: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  countryCode: string;
  phone: string;
}

/** Customer profile returned by GET /auth/customer/me. */
export interface CustomerProfile {
  id: string;
  customerId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  status?: string;
  loyaltyTier?: string;
  loyaltyPoints?: number;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  totalOrders?: number;
  totalSpent?: string;
  lastOrderAt?: string | null;
  lastLoginAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  addresses?: CustomerAddress[];
  connectedProviders?: string[];
  stats?: {
    totalOrders: number;
    totalWishlists: number;
    totalReviews: number;
  };
}
