"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table";

interface CastingCall {
  _id: string;
  title: string;
  subTitle: string;
  sourceLink: string;
  description: string;
  projectType: string;
  projectLanguage: string;
  coverImage: string;
  status: boolean;
  createdAt: string;
}

export default function CastingCallPage() {
  const columns = [
    {
      header: "Casting Call",
      accessorKey: "coverImage",
      cell: (row: CastingCall) => (
        <div className="h-16 w-32 rounded-md bg-muted relative overflow-hidden">
          <Image
            src={`${row.coverImage}`}
            alt="CastingCall preview"
            className="object-cover w-full h-full"
            width={100}
            height={100}
          />
        </div>
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: (row: CastingCall) => (
        <span className="font-medium">{row.title}</span>
      ),
      sortable: true,
    },
    {
      header: "Subtitle",
      accessorKey: "subTitle",
      cell: (row: CastingCall) => (
        <span className="font-medium">{row.subTitle}</span>
      ),
    },
    {
      header: "Project Type",
      accessorKey: "projectType",
      cell: (row: CastingCall) => (
        <div className="flex gap-1">
          {row.projectType && (
            <Badge variant="secondary">{row.projectType}</Badge>
          )}
          {row.projectLanguage && (
            <Badge variant="secondary">{row.projectLanguage}</Badge>
          )}
        </div>
      ),
    },
    {
      header: "Source Link",
      accessorKey: "sourceLink",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: CastingCall) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: CastingCall) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<CastingCall>
      title="Casting Calls"
      description="Manage website casting calls"
      columns={columns}
      apiUrl="/casting-calls"
    />
  );
}
