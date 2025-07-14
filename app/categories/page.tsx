"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";

interface Category {
  _id: string;
  name: string;
  slug: string;
  desc: string;
  projects: string[];
  image: string;
  isAvailable: boolean;
  createdAt: string;
}

export default function CategoriesPage() {
  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: (row: Category) =>
        row.image ? (
          <div className="h-16 w-32 rounded-md bg-muted relative overflow-hidden">
            <Image
              src={`https://www.server.cinefy.in/uploads/${row.image}`}
              alt={row.name}
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
      header: "Category",
      accessorKey: "name",
      cell: (row: Category) => <span className="font-medium">{row.name}</span>,
      sortable: true,
    },
    {
      header: "Description",
      accessorKey: "desc",
    },
    {
      header: "Properties",
      accessorKey: "properties",
      cell: (row: Category) => (
        <span className="font-medium">{row.projects.length}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "isAvailable",
      cell: (row: Category) => (
        <Badge variant={row.isAvailable ? "success" : "destructive"}>
          {row.isAvailable ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Category) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Category>
      title="Categories"
      description="Manage property categories"
      columns={columns}
      apiUrl="/categories"
    />
  );
}
