"use client";

import { campaignService } from "@/services/campaign.service";
import { Campaign, CreateCampaignRequest, UpdateCampaignRequest } from "@/types/campaign";
import { useCallback, useEffect, useState } from "react";


type UseCampaignsOptions = {
  autoLoad?: boolean;
  category?: string;
};

export function useCampaigns(options: UseCampaignsOptions = {}) {
  const { autoLoad = true, category } = options;

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findAll = useCallback(
    async (categoryFilter?: string) => {
      try {
        setLoading(true);
        setError("");

        const response = await campaignService.findAll(
          categoryFilter ?? category,
        );

        setCampaigns(response.campaigns);

        return response.campaigns;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error al cargar campañas";

        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [category],
  );

  async function findOne(id: string) {
    try {
      setLoading(true);
      setError("");

      const response = await campaignService.findOne(id);

      setSelectedCampaign(response.campaign);

      return response.campaign;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar la campaña";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function create(data: CreateCampaignRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await campaignService.create(data);

      setCampaigns((prev) => [response.campaign, ...prev]);

      return response.campaign;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear la campaña";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function update(id: string, data: UpdateCampaignRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await campaignService.update(id, data);

      setCampaigns((prev) =>
        prev.map((campaign) =>
          campaign.id === id ? response.campaign : campaign,
        ),
      );

      setSelectedCampaign(response.campaign);

      return response.campaign;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al actualizar la campaña";

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

      await campaignService.remove(id);

      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));

      if (selectedCampaign?.id === id) {
        setSelectedCampaign(null);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al eliminar la campaña";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoLoad) {
      findAll();
    }
  }, [autoLoad, findAll]);

  return {
    campaigns,
    selectedCampaign,
    loading,
    error,
    findAll,
    findOne,
    create,
    update,
    remove,
    setCampaigns,
    setSelectedCampaign,
  };
}