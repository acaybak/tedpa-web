import { getAuditLogs } from "@/actions/content-actions";
import { AuditLogsClient } from "@/components/admin/audit-logs-client";
export const instant = false;
export default async function AuditLogsPage() {
  const result = await getAuditLogs({ limit: 100 });
  return <AuditLogsClient logs={result.data} />;
}
