export interface user {
  id?: string;
  email: string;
  password: string;
  fullname?: string;
  picture?: string;
  provider?: "google" | "local";
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken?: string | null;
  resetPasswordExpiresAt?: Date | null;
  verificationToken?: string | null;
  verificationTokenExpiresAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
