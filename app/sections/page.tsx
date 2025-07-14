"use client";

import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Section {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  projects: string[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SectionsPage() {
  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: (row: Section) =>
        row.image ? (
          <div className="h-16 w-32 rounded-md bg-muted relative overflow-hidden">
            <Image
              src={`https://www.server.cinefy.in/uploads/${row.image}`}
              alt={row.title}
              className="object-cover w-full h-full"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div className="h-16 w-32 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
            No image
          </div>
        ),
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (row: Section) => (
        <div>
          <p className="font-medium">{row.title}</p>
          {row.subtitle && (
            <p className="text-sm text-muted-foreground">{row.subtitle}</p>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      header: "Listings",
      accessorKey: "projects",
      cell: (row: Section) => (
        <span className="font-medium">{row.projects.length} nos</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Section) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Section) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      header: "Last Updated",
      accessorKey: "updatedAt",
      cell: (row: Section) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Section>
      title="Sections"
      description="Manage property sections"
      columns={columns}
      apiUrl="/sections"
    />
  );
}
