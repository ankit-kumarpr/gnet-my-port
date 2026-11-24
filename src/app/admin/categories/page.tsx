"use client";

import { useState, useEffect } from "react";
import {
  Tag,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
  Save,
  ArrowUpDown,
} from "lucide-react";

interface CategoryItem {
  _id?: string;
  id?: string;
  slug: string;
  label: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err: any) {
      setError(err.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory({
      slug: "",
      label: "",
      description: "",
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory({ ...cat });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setSaving(true);
    setError(null);

    try {
      const isEdit = !!editingCategory._id;
      const targetId = editingCategory._id || editingCategory.slug;
      const endpoint = isEdit
        ? `/api/admin/categories/${targetId}`
        : "/api/admin/categories";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save category.");
      }

      setIsModalOpen(false);
      setEditingCategory(null);
      loadCategories();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (targetId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setDeletingId(targetId);
    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/categories/${targetId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete category.");
      }
      loadCategories();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeleting(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-[#00D6A0] flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D6A0]" />
            <span>TAXONOMY & CLASSIFICATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F8FA] tracking-tight">
            Project Categories
          </h1>
          <p className="text-xs sm:text-sm text-[#A5B2C0]">
            Configure category filters for the portfolio showcase and project forms.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00D6A0] hover:bg-[#00BF8F] text-[#050A0B] text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-[#00D6A0]/20 hover:shadow-[#00D6A0]/35 transition-all w-fit cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Category</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* CATEGORIES TABLE                                                   */}
      {/* ------------------------------------------------------------------ */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 text-[#00D6A0] animate-spin" />
          <span className="text-xs font-mono text-[#A5B2C0]">Loading categories...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#0C1721] border border-white/[0.08] text-center space-y-4">
          <Tag className="w-12 h-12 text-[#A5B2C0] mx-auto opacity-40" />
          <h3 className="text-lg font-bold text-[#F5F8FA]">No Categories Available</h3>
          <p className="text-xs text-[#A5B2C0] max-w-sm mx-auto">
            Create categories to organize your engineering projects and case studies.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00D6A0] text-[#050A0B] text-xs font-mono font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Category</span>
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0C1721] border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-[#A5B2C0] bg-white/[0.02]">
                  <th className="py-3.5 px-4 w-16 text-center">Order</th>
                  <th className="py-3.5 px-4">Display Label</th>
                  <th className="py-3.5 px-4">Slug Identifier</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs">
                {categories.map((cat, idx) => {
                  const targetId = cat._id || cat.slug || cat.id || String(idx);
                  return (
                    <tr
                      key={targetId}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-3.5 px-4 text-center font-mono text-[#00D6A0]">
                        #{cat.displayOrder || idx + 1}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-[#F5F8FA]">
                        {cat.label}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-xs text-[#A5B2C0]">
                        {cat.slug}
                      </td>

                      <td className="py-3.5 px-4 text-[#A5B2C0] max-w-xs truncate">
                        {cat.description || "—"}
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                            cat.isActive !== false
                              ? "bg-[#00D6A0]/15 text-[#00D6A0] border border-[#00D6A0]/30"
                              : "bg-white/10 text-white/50 border border-white/10"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{cat.isActive !== false ? "ACTIVE" : "INACTIVE"}</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(cat)}
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-[#00D6A0]/20 hover:text-[#00D6A0] text-[#A5B2C0] transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(targetId)}
                            disabled={deleting && deletingId === targetId}
                            className="p-2 rounded-lg bg-white/[0.04] hover:bg-red-500/20 hover:text-red-400 text-[#A5B2C0] transition-colors cursor-pointer disabled:opacity-50"
                            title="Delete Category"
                          >
                            {deleting && deletingId === targetId ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
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
      {/* ADD / EDIT MODAL                                                   */}
      {/* ------------------------------------------------------------------ */}
      {isModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-[#0C1721] border border-white/[0.12] p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-sm font-bold text-[#F5F8FA]">
                <Tag className="w-4 h-4 text-[#00D6A0]" />
                <span>
                  {editingCategory._id ? "Edit Category" : "Add New Category"}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                }}
                className="text-[#A5B2C0] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                  Display Label <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.label}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingCategory((prev) => {
                      if (!prev) return prev;
                      const updated = { ...prev, label: val };
                      if (!prev._id && (!prev.slug || prev.slug === prev.label.toLowerCase().replace(/[^a-z0-9-]+/g, "-"))) {
                        updated.slug = val.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/(^-|-$)+/g, "");
                      }
                      return updated;
                    });
                  }}
                  placeholder="e.g. AI & Automation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm text-[#F5F8FA] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                  Slug (URL / Filter Key) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.slug}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev
                        ? {
                            ...prev,
                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                          }
                        : prev
                    )
                  }
                  placeholder="e.g. ai"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] focus:border-[#00D6A0] text-sm font-mono text-[#F5F8FA] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.description || ""}
                  onChange={(e) =>
                    setEditingCategory((prev) =>
                      prev ? { ...prev, description: e.target.value } : prev
                    )
                  }
                  placeholder="Classification details..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-xs text-[#F5F8FA] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-medium text-[#A5B2C0]">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingCategory.displayOrder}
                    onChange={(e) =>
                      setEditingCategory((prev) =>
                        prev
                          ? { ...prev, displayOrder: parseInt(e.target.value) || 0 }
                          : prev
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#070D14] border border-white/[0.08] text-xs font-mono text-[#F5F8FA] outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[#F5F8FA]">
                    <input
                      type="checkbox"
                      checked={editingCategory.isActive}
                      onChange={(e) =>
                        setEditingCategory((prev) =>
                          prev ? { ...prev, isActive: e.target.checked } : prev
                        )
                      }
                      className="w-4 h-4 rounded text-[#00D6A0] bg-[#070D14] border-white/20"
                    />
                    <span>Active In Filters</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-[#A5B2C0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#00D6A0] hover:bg-[#00BF8F] text-[#050A0B] text-xs font-mono font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? "Saving..." : "Save Category"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
