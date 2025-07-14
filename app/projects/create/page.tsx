"use client";
import { Button } from "@/components/ui/button";
import Layout from "@/components/component-layout";
import { ProjectForm } from "@/components/projects/project-form";
import api from "@/axios-instance";

export default function AddProjectPage() {
  const handleSubmit = async (data: any) => {
    await api.post("/api/projects", data);
  };
  return (
    <Layout title="Add Project" action={<Button>Save Project</Button>}>
      <ProjectForm
        onSubmit={handleSubmit}
      />
    </Layout>
  );
}
