export interface Domain {
  name: string;
  verified: boolean;
  deleted: boolean;
  created_at: string;
  verification_code?: string;
}
