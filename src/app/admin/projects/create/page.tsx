import ProjectForm from "@/components/admin/ProjectForm";

export const metadata = {
  title: "New Case Study — Grandeur Net CMS",
  description: "Create a new portfolio project case study",
};

export default function CreateProjectPage() {
  return (
    <div className="py-2">
      <ProjectForm isEdit={false} />
    </div>
  );
}
