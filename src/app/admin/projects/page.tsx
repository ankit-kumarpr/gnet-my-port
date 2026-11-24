"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Search,
  Plus,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Loader2,
  AlertTriangle,
  X,
} from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category !== "all") params.set("category", category);
      if (status !== "all") params.set("status", status);

      const res = await fetch(`/api/admin/projects?${params.toString()}`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, category, status]);

  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/projects/${deleteModal.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete project");
      }

      setDeleteModal(null);
      loadProjects();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* SECTION HEADER                                                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span>CASE STUDIES REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA] tracking-tight">
            Manage All Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#A5B2C0]">
            Review, edit, publish, or remove portfolio case studies and dynamic assets.
          </p>
        </div>

        <Link
          href="/admin/projects/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D6A0] hover:bg-[#00BF8F] text-[#050A0B] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#00D6A0]/20 hover:shadow-[#00D6A0]/35 transition-all w-fit"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Project</span>
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* SEARCH AND FILTERS BAR                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-4 rounded-2xl bg-[#0C1721] border border-white/[0.08] flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#A5B2C0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, client name, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-xs sm:text-sm text-[#F5F8FA] placeholder:text-[#A5B2C0]/40 outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-xs font-mono text-[#F5F8FA] outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All Status" },
            { id: "published", label: "Published" },
            { id: "draft", label: "Draft" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatus(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                status === tab.id
                  ? "bg-[#00D6A0] text-[#050A0B] font-bold"
                  : "bg-white/[0.04] text-[#A5B2C0] hover:text-[#F5F8FA]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PROJECTS TABLE / CARDS                                             */}
      {/* ------------------------------------------------------------------ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-[#00D6A0] animate-spin" />
          <span className="text-xs font-mono text-[#A5B2C0]">Fetching projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#0C1721] border border-white/[0.08] text-center space-y-4">
          <FolderKanban className="w-12 h-12 text-[#A5B2C0] mx-auto opacity-40" />
          <h3 className="text-lg font-bold text-[#F5F8FA]">No projects found</h3>
          <p className="text-xs text-[#A5B2C0] max-w-sm mx-auto">
            Try adjusting your search criteria or add your first dynamic project case study.
          </p>
          <Link
            href="/admin/projects/create"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0C1721] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-[#A5B2C0] bg-white/[0.02]">
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Value & Timeline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                {projects.map((p) => {
                  const projectId = p.id || p.slug || p._id;
                  const isPublished = p.status === "published";

                  return (
                    <tr
                      key={projectId}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Image & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#070D14] border border-white/[0.08] shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div>
                            <div className="font-bold text-[#F5F8FA] group-hover:text-[#00D6A0] transition-colors">
                              {p.title}
                            </div>
                            <div className="text-[11px] font-mono text-[#A5B2C0]/70">
                              /{p.slug || p.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="py-3 px-4 text-[#A5B2C0] font-medium">
                        {p.client}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.06] text-[11px] font-mono text-[#A5B2C0]">
                          {p.categoryLabel || p.category}
                        </span>
                      </td>

                      {/* Value & Duration */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#F5F8FA]">
                          {p.estimatedCost}
                        </div>
                        <div className="text-[11px] font-mono text-[#00D6A0]">
                          {p.duration} ({p.sprints || 1} Sprints)
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isPublished
                              ? "bg-[#00D6A0]/15 text-[#00D6A0] border border-[#00D6A0]/30"
                              : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {isPublished ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          <span>{p.status || "published"}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live public view */}
                          <Link
                            href={`/projects/${p.slug || p.id}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-[#A5B2C0] transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          {/* Edit Project */}
                          <Link
                            href={`/admin/projects/edit/${projectId}`}
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#00D6A0]/20 hover:text-[#00D6A0] text-[#A5B2C0] transition-colors"
                            title="Edit Case Study"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {/* Delete Project */}
                          <button
                            onClick={() =>
                              setDeleteModal({
                                id: projectId,
                                title: p.title,
                              })
                            }
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-[#A5B2C0] hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* DELETE CONFIRMATION MODAL                                          */}
      {/* ------------------------------------------------------------------ */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#0C1721] border border-white/[0.12] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                onClick={() => setDeleteModal(null)}
                className="text-[#A5B2C0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#F5F8FA]">
                Delete Project Case Study?
              </h3>
              <p className="text-xs text-[#A5B2C0] leading-relaxed">
                Are you sure you want to permanently delete{" "}
                <strong className="text-white">"{deleteModal.title}"</strong>?
                This action will remove the project from MongoDB and clean up associated Cloudinary assets. This cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono font-medium text-[#A5B2C0]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-mono font-bold flex items-center gap-2 cursor-pointer"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{deleting ? "Deleting..." : "Confirm Delete"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
