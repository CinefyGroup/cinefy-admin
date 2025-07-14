"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table";

interface Banner {
  _id: string;
  title: string;
  subTitle: string;
  url: string;
  description: string;
  src: string;
  status: boolean;
  createdAt: string;
}

export default function BannersPage() {
  const columns = [
    {
      header: "Banner",
      accessorKey: "src",
      cell: (row: Banner) => (
        <div className="h-16 w-32 rounded-md bg-muted relative overflow-hidden">
          <Image
            src={`https://www.server.cinefy.in/uploads/${row.src}`}
            alt="Banner preview"
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
      cell: (row: Banner) => <span className="font-medium">{row.title}</span>,
      sortable: true,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row: Banner) => (
        <span className="font-medium">{row.description}</span>
      ),
    },
    {
      header: "Link",
      accessorKey: "url",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Banner) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Banner) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Banner>
      title="Banners"
      description="Manage website banners and promotions"
      columns={columns}
      apiUrl="/banners"
    />
  );
}
