"use client";

import { useEffect, useState } from "react";


import { documentService } from "@/services/document.service";
import { CampaignDocument, CreateDocumentRequest, UpdateDocumentRequest } from "@/types/document";

type UseDocumentsOptions = {
  autoLoad?: boolean;
  userOnly?: boolean;
  campaignId?: string;
};

export function useDocuments(options: UseDocumentsOptions = {}) {
  const { autoLoad = true, userOnly = false, campaignId } = options;

  const [documents, setDocuments] = useState<CampaignDocument[]>([]);
  const [selectedDocument, setSelectedDocument] =
    useState<CampaignDocument | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findAll() {
    try {
      setLoading(true);
      setError("");

      const response = await documentService.findAll();

      setDocuments(response.documents);

      return response.documents;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar documentos";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function findMyDocuments() {
    try {
      setLoading(true);
      setError("");

      const response = await documentService.findMyDocuments();

      setDocuments(response.documents);

      return response.documents;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar tus documentos";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function findByCampaign(campaignIdValue: string) {
    try {
      setLoading(true);
      setError("");

      const response = await documentService.findByCampaign(campaignIdValue);

      setDocuments(response.documents);

      return response.documents;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error al cargar documentos de la campaña";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function findOne(id: string) {
    try {
      setLoading(true);
      setError("");

      const response = await documentService.findOne(id);

      setSelectedDocument(response.document);

      return response.document;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar el documento";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function create(data: CreateDocumentRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await documentService.create(data);

      setDocuments((prev) => [response.document, ...prev]);

      return response.document;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al subir el documento";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function update(id: string, data: UpdateDocumentRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await documentService.update(id, data);

      setDocuments((prev) =>
        prev.map((document) =>
          document.id === id ? response.document : document,
        ),
      );

      setSelectedDocument(response.document);

      return response.document;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al actualizar el documento";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    try {
      setLoading(true);
      setError("");

      await documentService.remove(id);

      setDocuments((prev) => prev.filter((document) => document.id !== id));

      if (selectedDocument?.id === id) {
        setSelectedDocument(null);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al eliminar el documento";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!autoLoad) return;

    if (campaignId) {
      findByCampaign(campaignId);
      return;
    }

    if (userOnly) {
      findMyDocuments();
      return;
    }

    findAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad, userOnly, campaignId]);

  return {
    documents,
    selectedDocument,
    loading,
    error,
    findAll,
    findMyDocuments,
    findByCampaign,
    findOne,
    create,
    update,
    remove,
    setDocuments,
    setSelectedDocument,
  };
}