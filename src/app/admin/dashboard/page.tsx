"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Tag,
  Plus,
  ExternalLink,
  ArrowUpRight,
  Database,
  Cloud,
  ShieldAlert,
  Loader2,
  Edit,
  RefreshCw,
} from "lucide-react";

interface DashboardStats {
  total: number;
  published: number;
  draft: number;
  categories: number;
  recentProjects: any[];
  recentLogs: any[];
  dbConnected: boolean;
  cloudinaryConfigured: boolean;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    published: 0,
    draft: 0,
    categories: 0,
    recentProjects: [],
    recentLogs: [],
    dbConnected: false,
    cloudinaryConfigured: false,
  });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const handleSeed = async () => {
    if (!confirm("Import and sync all static projects from src/data/projects.ts into MongoDB?")) return;
    setSeeding(true);
    setSeedResult(null);

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to seed database.");
      }
      setSeedResult(data.message || "Database synchronization complete.");
      window.location.reload();
    } catch (err: any) {
      setSeedResult(`Error: ${err.message}`);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [projectsRes, categoriesRes, logsRes, cloudRes] = await Promise.all([
          fetch("/api/admin/projects?limit=5"),
          fetch("/api/admin/categories"),
          fetch("/api/admin/audit-logs?limit=5"),
          fetch("/api/admin/media/signature"),
        ]);

        const projectsData = await projectsRes.json();
        const categoriesData = await categoriesRes.json();
        const logsData = await logsRes.json();
        const cloudData = await cloudRes.json();

        const projects = projectsData.projects || [];
        const published = projects.filter((p: any) => p.status === "published").length;
        const draft = projects.filter((p: any) => p.status === "draft").length;

        setStats({
          total: projectsData.pagination?.total || projects.length,
          published: published || projects.length,
          draft: draft || 0,
          categories: (categoriesData.categories || []).length,
          recentProjects: projects.slice(0, 5),
          recentLogs: logsData.logs || [],
          dbConnected: projectsData.source === "database",
          cloudinaryConfigured: !!cloudData.configured,
        });
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-8 h-8 text-[#00D6A0] animate-spin" />
        <span className="text-xs font-mono text-[#A5B2C0]">Loading CMS Dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ------------------------------------------------------------------ */}
      {/* TOP HEADER & WELCOME                                               */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span>CENTRAL OVERVIEW</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA] tracking-tight">
            Projects Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#A5B2C0]">
            Monitor live case studies, database connectivity, and administrative actions.
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono font-medium text-[#00D6A0] transition-colors cursor-pointer disabled:opacity-50"
            title="Import all static projects from src/data/projects.ts into MongoDB"
          >
            {seeding ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
            <span>{seeding ? "Syncing..." : "Seed / Sync DB"}</span>
          </button>

          <Link
            href="/admin/projects/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D6A0] hover:bg-[#00BF8F] text-[#050A0B] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#00D6A0]/20 hover:shadow-[#00D6A0]/35 transition-all w-fit"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {seedResult && (
        <div className="p-3.5 rounded-xl bg-[#00D6A0]/10 border border-[#00D6A0]/30 text-[#00D6A0] text-xs font-mono flex items-center justify-between">
          <span>{seedResult}</span>
          <button onClick={() => setSeedResult(null)} className="text-white/60 hover:text-white">✕</button>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* SYSTEM HEALTH CARDS (DATABASE & CLOUDINARY)                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Database Status */}
        <div className="p-4 rounded-2xl bg-[#0C1721] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              stats.dbConnected ? "bg-[#00D6A0]/15 text-[#00D6A0]" : "bg-amber-500/15 text-amber-400"
            }`}>
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F8FA]">
                MongoDB Atlas
              </div>
              <div className="text-[11px] font-mono text-[#A5B2C0]">
                {stats.dbConnected ? "Connected & Synchronized" : "Local Static Fallback Active"}
              </div>
            </div>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
            stats.dbConnected ? "bg-[#00D6A0]/15 text-[#00D6A0] border border-[#00D6A0]/30" : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
          }`}>
            {stats.dbConnected ? "ACTIVE" : "STANDBY"}
          </span>
        </div>

        {/* Cloudinary Status */}
        <div className="p-4 rounded-2xl bg-[#0C1721] border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              stats.cloudinaryConfigured ? "bg-[#00D6A0]/15 text-[#00D6A0]" : "bg-slate-500/15 text-slate-400"
            }`}>
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F5F8FA]">
                Cloudinary Asset Storage
              </div>
              <div className="text-[11px] font-mono text-[#A5B2C0]">
                {stats.cloudinaryConfigured ? "Signed Uploads Ready" : "Manual URL Entry Available"}
              </div>
            </div>
          </div>
          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
            stats.cloudinaryConfigured ? "bg-[#00D6A0]/15 text-[#00D6A0] border border-[#00D6A0]/30" : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
          }`}>
            {stats.cloudinaryConfigured ? "CONFIGURED" : "FALLBACK"}
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4 PRIMARY KPI CARDS                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Projects */}
        <div className="p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#A5B2C0]">
            <span>Total Projects</span>
            <FolderKanban className="w-4 h-4 text-[#00D6A0]" />
          </div>
          <div className="text-3xl font-black text-[#F5F8FA] tracking-tight">
            {stats.total}
          </div>
          <div className="text-[11px] font-mono text-[#A5B2C0]/70">
            Recorded in repository
          </div>
        </div>

        {/* Published Projects */}
        <div className="p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#A5B2C0]">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-[#00D6A0]" />
          </div>
          <div className="text-3xl font-black text-[#00D6A0] tracking-tight">
            {stats.published}
          </div>
          <div className="text-[11px] font-mono text-[#A5B2C0]/70">
            Visible on live website
          </div>
        </div>

        {/* Drafts */}
        <div className="p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#A5B2C0]">
            <span>Draft Status</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 tracking-tight">
            {stats.draft}
          </div>
          <div className="text-[11px] font-mono text-[#A5B2C0]/70">
            Private work-in-progress
          </div>
        </div>

        {/* Categories */}
        <div className="p-5 rounded-2xl bg-[#0C1721] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#A5B2C0]">
            <span>Categories</span>
            <Tag className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-300 tracking-tight">
            {stats.categories}
          </div>
          <div className="text-[11px] font-mono text-[#A5B2C0]/70">
            Project classifications
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* RECENT PROJECTS & RECENT AUDIT LOGS (SPLIT VIEW)                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Recent Projects */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F8FA] flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-[#00D6A0]" />
              <span>Recent Projects</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-[#00D6A0] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentProjects.length === 0 ? (
              <div className="p-6 rounded-2xl bg-[#0C1721] border border-white/[0.08] text-center text-xs font-mono text-[#A5B2C0]">
                No projects found. Click "New Project" to create your first case study.
              </div>
            ) : (
              stats.recentProjects.map((p: any) => (
                <div
                  key={p.id || p._id}
                  className="p-3.5 rounded-2xl bg-[#0C1721] border border-white/[0.08] hover:border-[#00D6A0]/40 transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#070D14] border border-white/[0.06] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#F5F8FA] truncate group-hover:text-[#00D6A0] transition-colors">
                          {p.title}
                        </h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-[#A5B2C0]">
                          {p.categoryLabel || p.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#A5B2C0] truncate mt-0.5">
                        Client: {p.client} • {p.estimatedCost}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/admin/projects/edit/${p.id || p._id}`}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-[#00D6A0]/20 hover:text-[#00D6A0] text-[#A5B2C0] transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/projects/${p.id || p.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#A5B2C0] transition-colors"
                      title="Open Public Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Recent Audit Activity Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F8FA] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#00D6A0]" />
              <span>Audit Trail</span>
            </h2>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-mono text-[#00D6A0] hover:underline flex items-center gap-1"
            >
              <span>View Logs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl bg-[#0C1721] border border-white/[0.08] p-4 divide-y divide-white/[0.06] space-y-3">
            {stats.recentLogs.length === 0 ? (
              <div className="text-center py-6 text-xs font-mono text-[#A5B2C0]">
                No recent activity logged yet.
              </div>
            ) : (
              stats.recentLogs.map((log: any) => (
                <div key={log._id} className="pt-3 first:pt-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#00D6A0]">
                      {log.action}
                    </span>
                    <span className="text-[10px] font-mono text-[#A5B2C0]/70">
                      {new Date(log.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-[#A5B2C0] mt-0.5 truncate">
                    {log.details?.title || log.details?.email || log.resourceType} • {log.adminEmail || "system"}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
