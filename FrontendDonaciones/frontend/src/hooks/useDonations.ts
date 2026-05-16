"use client";

import { useEffect, useState } from "react";

import { donationService } from "@/services/donation.service";
import { CreateDonationRequest, Donation, DonationStatus } from "@/types/donation";

type UseDonationsOptions = {
  autoLoad?: boolean;
  userOnly?: boolean;
  campaignId?: string;
};

export function useDonations(options: UseDonationsOptions = {}) {
  const { autoLoad = true, userOnly = false, campaignId } = options;

  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findAll() {
    try {
      setLoading(true);
      setError("");

      const response = await donationService.findAll();
      setDonations(response.donations);

      return response.donations;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar donaciones";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function findMyDonations() {
    try {
      setLoading(true);
      setError("");

      const response = await donationService.findMyDonations();
      setDonations(response.donations);

      return response.donations;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar tus donaciones";

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

      const response = await donationService.findByCampaign(campaignIdValue);
      setDonations(response.donations);

      return response.donations;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error al cargar donaciones de la campaña";

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

      const response = await donationService.findOne(id);
      setSelectedDonation(response.donation);

      return response.donation;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al cargar la donación";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function create(data: CreateDonationRequest) {
    try {
      setLoading(true);
      setError("");

      const response = await donationService.create(data);

      setDonations((prev) => [response.donation, ...prev]);

      return response.donation;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error al crear la donación";

      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: DonationStatus) {
    try {
      setLoading(true);
      setError("");

      const response = await donationService.updateStatus(id, status);

      setDonations((prev) =>
        prev.map((donation) =>
          donation.id === id ? response.donation : donation,
        ),
      );

      setSelectedDonation(response.donation);

      return response.donation;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error al actualizar la donación";

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
      findMyDonations();
      return;
    }

    findAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad, userOnly, campaignId]);

  return {
    donations,
    selectedDonation,
    loading,
    error,
    findAll,
    findMyDonations,
    findByCampaign,
    findOne,
    create,
    updateStatus,
    setDonations,
    setSelectedDonation,
  };
}