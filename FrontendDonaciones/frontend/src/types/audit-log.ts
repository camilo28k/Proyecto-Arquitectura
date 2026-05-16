import { User } from "./user";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "LOGIN"
  | "DONATION"
  | "DOCUMENT_UPLOAD"
  | "DOCUMENT_GENERATE";

export interface AuditLog {
  id: string;
  action: AuditAction;

  entity?: string | null;
  entityId?: string | null;
  description?: string | null;

  userId?: string | null;
  user?: User | null;

  createdAt: string;
}