"use client";

import { useState, useEffect } from "react";
import {
  History,
  ShieldCheck,
  Search,
  Filter,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  Globe,
  User,
} from "lucide-react";

interface AuditLogItem {
  _id: string;
  adminEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

const ACTION_OPTIONS = [
  { value: "", label: "All Actions" },
  { value: "LOGIN_SUCCESS", label: "Login Success" },
  { value: "PROJECT_CREATE", label: "Project Created" },
  { value: "PROJECT_UPDATE", label: "Project Updated" },
  { value: "PROJECT_DELETE", label: "Project Deleted" },
  { value: "CATEGORY_CREATE", label: "Category Created" },
  { value: "CATEGORY_UPDATE", label: "Category Updated" },
  { value: "CATEGORY_DELETE", label: "Category Deleted" },
  { value: "MEDIA_UPLOAD_SIGNATURE", label: "Media Upload Signature" },
];

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "25",
      });
      if (action) params.set("action", action);

      const res = await fetch(`/api/admin/audit-logs?${params.toString()}`);
      const data = await res.json();

      setLogs(data.logs || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotal(data.pagination?.total || 0);
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, action]);

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span>IMMUTABLE SECURITY TRAIL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA] tracking-tight">
            System Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-[#A5B2C0]">
            Review all administrative mutations, user authentications, and file operations.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0C1721] border border-white/[0.08] text-xs font-mono text-[#A5B2C0]">
          <ShieldCheck className="w-4 h-4 text-[#00D6A0]" />
          <span>Total Recorded Events: {total}</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* FILTER CONTROLS                                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-4 rounded-2xl bg-[#0C1721] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#A5B2C0]" />
          <span className="text-xs font-mono text-[#A5B2C0]">Filter Action:</span>
        </div>

        <select
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
            setPage(1);
          }}
          className="w-full sm:w-64 px-3.5 py-2 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-xs font-mono text-[#F5F8FA] outline-none"
        >
          {ACTION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* AUDIT LOGS TABLE                                                   */}
      {/* ------------------------------------------------------------------ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-[#00D6A0] animate-spin" />
          <span className="text-xs font-mono text-[#A5B2C0]">Loading audit stream...</span>
        </div>
      ) : logs.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#0C1721] border border-white/[0.08] text-center space-y-4">
          <History className="w-12 h-12 text-[#A5B2C0] mx-auto opacity-40" />
          <h3 className="text-lg font-bold text-[#F5F8FA]">No Audit Events Found</h3>
          <p className="text-xs text-[#A5B2C0] max-w-sm mx-auto">
            Audit logs will record here automatically when administrators perform actions.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0C1721] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-[#A5B2C0] bg-white/[0.02]">
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Admin Email</th>
                  <th className="py-3.5 px-4">Target Resource</th>
                  <th className="py-3.5 px-4">IP Address</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs font-mono">
                {logs.map((log) => {
                  const isExpanded = expandedId === log._id;

                  return (
                    <tr
                      key={log._id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#00D6A0]/10 text-[#00D6A0] border border-[#00D6A0]/25 text-[11px] font-bold">
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-[#F5F8FA]">
                        {log.adminEmail || "anonymous"}
                      </td>

                      <td className="py-3.5 px-4 text-[#A5B2C0]">
                        <span className="text-[11px] text-[#00D6A0]">
                          {log.resourceType}
                        </span>{" "}
                        {log.resourceId && (
                          <span className="text-[10px] text-white/40">
                            ({log.resourceId})
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-[#A5B2C0]/70 text-[11px]">
                        {log.ipAddress || "127.0.0.1"}
                      </td>

                      <td className="py-3.5 px-4 text-[#A5B2C0] text-[11px]">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : log._id)}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs text-[#A5B2C0] hover:text-[#F5F8FA] cursor-pointer"
                        >
                          {isExpanded ? "Hide" : "Inspect"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Details Drawer if item selected */}
          {expandedId && (
            <div className="p-4 bg-[#070D14] border-t border-white/[0.08] text-xs">
              {(() => {
                const target = logs.find((l) => l._id === expandedId);
                if (!target) return null;
                return (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[#00D6A0] font-bold">
                      <span>Event Inspection: {target.action}</span>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="text-[#A5B2C0] hover:text-white"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-black/40 border border-white/[0.06] overflow-x-auto text-[11px] font-mono text-[#A5B2C0]">
                      {JSON.stringify(
                        {
                          action: target.action,
                          resourceType: target.resourceType,
                          resourceId: target.resourceId,
                          details: target.details,
                          ipAddress: target.ipAddress,
                          userAgent: target.userAgent,
                          timestamp: target.createdAt,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PAGINATION                                                         */}
      {/* ------------------------------------------------------------------ */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs font-mono text-[#A5B2C0]">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-2 rounded-xl bg-[#0C1721] border border-white/[0.08] text-[#A5B2C0] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-2 rounded-xl bg-[#0C1721] border border-white/[0.08] text-[#A5B2C0] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
