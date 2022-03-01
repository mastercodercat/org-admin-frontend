export interface Form {
  uuid?: string;
  name: string;
  organizationUuid?: string;
  status?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  content: string;
  confirmation: string;
  submissions?: number;
}
