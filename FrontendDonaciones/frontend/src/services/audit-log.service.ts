import { apiFetch } from "@/lib/api";
import { AuditAction, AuditLog } from "@/types/audit-log";


type AuditLogListResponse = {
  message: string;
  auditLogs: AuditLog[];
};

type AuditLogResponse = {
  message: string;
  auditLog: AuditLog;
};

type AuditLogFilters = {
  action?: AuditAction | "";
  entity?: string;
  userId?: string;
};

function buildAuditLogQuery(filters?: AuditLogFilters): string {
  if (!filters) return "";

  const params = new URLSearchParams();

  if (filters.action) {
    params.append("action", filters.action);
  }

  if (filters.entity) {
    params.append("entity", filters.entity);
  }

  if (filters.userId) {
    params.append("userId", filters.userId);
  }

  const query = params.toString();

  return query ? `?${query}` : "";
}

export const auditLogService = {
  findAll(filters?: AuditLogFilters): Promise<AuditLogListResponse> {
    const query = buildAuditLogQuery(filters);

    return apiFetch<AuditLogListResponse>(`/audit-logs${query}`, {
      auth: true,
    });
  },

  findOne(id: string): Promise<AuditLogResponse> {
    return apiFetch<AuditLogResponse>(`/audit-logs/${id}`, {
      auth: true,
    });
  },

  findByUser(userId: string): Promise<AuditLogListResponse> {
    return apiFetch<AuditLogListResponse>(`/audit-logs/user/${userId}`, {
      auth: true,
    });
  },

  findByEntity(
    entity: string,
    entityId: string,
  ): Promise<AuditLogListResponse> {
    return apiFetch<AuditLogListResponse>(
      `/audit-logs/entity/${entity}/${entityId}`,
      {
        auth: true,
      },
    );
  },
};