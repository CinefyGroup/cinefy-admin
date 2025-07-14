"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";

interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  href: string;
  description: string;
  imageGallery?: { src: string }[];
  status: boolean;
  location: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: (row: Project) =>
        row.imageGallery?.[0]?.src ? (
          <div className="h-16 w-32 rounded-md bg-muted relative overflow-hidden">
            <Image
              src={`https://www.server.cinefy.in/uploads/${row.imageGallery?.[0]?.src}`}
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
      cell: (row: Project) => (
        <div>
          <p className="font-medium">{row.title}</p>
          {row.subtitle && (
            <p className="text-sm text-muted-foreground">{row.subtitle}</p>
          )}
        </div>
      ),
    },
    {
      header: "Slug",
      accessorKey: "href",
      cell: (row: Project) => (
        <Link
          href={`https://www.cinefy.in/property/${row.href}`}
          target="_blank"
        >
          {row.href}
        </Link>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Project) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Project) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Project>
      title="Projects"
      description="Manage property projects and listings"
      columns={columns}
      apiUrl="/projects"
    />
  );
}
