"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProject() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/projects/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load project details.");
        }

        setProject(data.project);
      } catch (err: any) {
        setError(err.message || "Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="w-8 h-8 text-[#00D6A0] animate-spin" />
        <span className="text-xs font-mono text-[#A5B2C0]">Loading project details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-8 rounded-3xl bg-[#0C1721] border border-white/[0.08] text-center space-y-4 max-w-lg mx-auto mt-12">
        <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-[#F5F8FA]">Project Not Found</h2>
        <p className="text-xs text-[#A5B2C0]">
          {error || `Could not find a project with identifier "${id}".`}
        </p>
        <div className="pt-2">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono text-[#F5F8FA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Repository</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
