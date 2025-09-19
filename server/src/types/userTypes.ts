export interface user {
  id?: string;
  email: string;
  password: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken: string | null;
  verificationTokenExpiresAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
