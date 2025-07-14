"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";

interface Tag {
  _id: string;
  title: string;
  description?: string;
  status: boolean;
  projects: string[];
  createdAt: string;
  updatedAt: string;
}

export default function TagsPage() {
  const columns = [
    {
      header: "Name",
      accessorKey: "title",
      cell: (row: Tag) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.title}</span>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row: Tag) => row.description || "-",
    },
    {
      header: "Projects",
      accessorKey: "projects",
      cell: (row: Tag) => row.projects.length,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Tag) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Tag) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      header: "Last Updated",
      accessorKey: "updatedAt",
      cell: (row: Tag) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Tag>
      title="Tags"
      description="Manage property tags"
      columns={columns}
      apiUrl="/tags"
    />
  );
}
