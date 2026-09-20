export interface UserType {
  id: string;
  fullName: string;
  avatarUrl: string;
  phone: number | string;
  email: string;
  address?: string;
  role?: string;
  companyName?: string;
  businessType?: string;
  vatTaxId?: string;
  contactPerson?: string;
  isBlocked: boolean;
  isAdminVerified?: boolean;
}
