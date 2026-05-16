import { apiFetch } from "@/lib/api";
import {
  CampaignDocument,
  CreateDocumentRequest,
  UpdateDocumentRequest,
} from "@/types/document";

type DocumentListResponse = {
  message: string;
  documents: CampaignDocument[];
};

type DocumentResponse = {
  message: string;
  document: CampaignDocument;
};

function buildDocumentFormData(data: CreateDocumentRequest): FormData {
  const formData = new FormData();

  formData.append("file", data.file);
  formData.append("title", data.title);
  formData.append("campaignId", data.campaignId);
  formData.append("type", data.type);

  if (data.description) {
    formData.append("description", data.description);
  }

  return formData;
}

export const documentService = {
  findAll(): Promise<DocumentListResponse> {
    return apiFetch<DocumentListResponse>("/documents", {
      auth: true,
    });
  },

  findMyDocuments(): Promise<DocumentListResponse> {
    return apiFetch<DocumentListResponse>("/documents/my-documents", {
      auth: true,
    });
  },

  findByCampaign(campaignId: string): Promise<DocumentListResponse> {
    return apiFetch<DocumentListResponse>(
      `/documents/campaign/${campaignId}`,
      {
        auth: true,
      },
    );
  },

  findOne(id: string): Promise<DocumentResponse> {
    return apiFetch<DocumentResponse>(`/documents/${id}`, {
      auth: true,
    });
  },

  create(data: CreateDocumentRequest): Promise<DocumentResponse> {
    const formData = buildDocumentFormData(data);

    return apiFetch<DocumentResponse>("/documents", {
      method: "POST",
      auth: true,
      body: formData,
    });
  },

  generateCampaignReport(campaignId: string): Promise<DocumentResponse> {
    return apiFetch<DocumentResponse>(
      `/documents/generate-report/${campaignId}`,
      {
        method: "POST",
        auth: true,
      },
    );
  },

  update(id: string, data: UpdateDocumentRequest): Promise<DocumentResponse> {
    return apiFetch<DocumentResponse>(`/documents/${id}`, {
      method: "PATCH",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  remove(id: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/documents/${id}`, {
      method: "DELETE",
      auth: true,
    });
  },
};