"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table";

interface Builder {
  _id: string;
  title: string;
  subtitle?: string;
  logo: string;
  projects: string[];
  location: string;
  url: string;
  isAvailable: boolean;
  createdAt: string;
}

export default function BuildersPage() {
  const columns = [
    {
      header: "Logo",
      accessorKey: "logo",
      cell: (row: Builder) => (
        <div className="h-16 w-16 rounded-md bg-muted relative overflow-hidden">
          <Image
            src={`https://www.server.cinefy.in/uploads/${row.logo}`}
            alt={`${row.title} logo`}
            className="object-contain w-full h-full"
            width={64}
            height={64}
          />
        </div>
      ),
    },
    {
      header: "Name",
      accessorKey: "title",
      cell: (row: Builder) => (
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
      header: "Slug",
      accessorKey: "url",
      cell: (row: Builder) => (
        <Link
          href={`https://www.cinefy.in/builder/${row.url}`}
          target="_blank"
        >
          {row.url}
        </Link>
      ),
    },
    {
      header: "Projects",
      accessorKey: "projects",
      cell: (row: Builder) => (
        <span className="font-medium">{row.projects.length}</span>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Status",
      accessorKey: "isAvailable",
      cell: (row: Builder) => (
        <Badge variant={row.isAvailable ? "success" : "destructive"}>
          {row.isAvailable ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Builder) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Builder>
      title="Builders"
      description="Manage property builders and developers"
      columns={columns}
      apiUrl="/builders"
    />
  );
}
