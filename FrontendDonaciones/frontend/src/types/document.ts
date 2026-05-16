import { Campaign } from "./campaign";
import { User } from "./user";

export type DocumentType = "UPLOADED" | "GENERATED";

export interface CampaignDocument {
  id: string;

  title: string;
  description?: string | null;
  type: DocumentType;

  fileUrl?: string | null;
  s3Key: string;
  bucket?: string | null;

  fileName?: string | null;
  mimeType?: string | null;
  size?: number | null;

  campaignId: string;
  uploadedById: string;

  campaign?: Campaign;
  uploadedBy?: User;

  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentRequest {
  title: string;
  description?: string;
  type: DocumentType;
  campaignId: string;
  file: File;
}

export interface UpdateDocumentRequest {
  title?: string;
  description?: string;
  type?: DocumentType;
}