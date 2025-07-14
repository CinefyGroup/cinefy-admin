"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import Image from "next/image";

interface Blog {
  _id: string;
  title: string;
  subTitle: string;
  image: string;
  url: string;
  status: boolean;
  banner: boolean;
  createdAt: string;
  isImportant: boolean;
}

export default function BlogsPage() {
  const columns = [
    {
      header: "Blog",
      accessorKey: "image",
      cell: (row: Blog) => (
        <div className="h-16 w-32 rounded-md bg-muted relative overflow-hidden">
          <Image
            src={`https://www.server.cinefy.in/uploads/${row.image}`}
            alt="Blog preview"
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
      sortable: true,
    },
    {
      header: "Slug",
      accessorKey: "url",
      cell: (row: Blog) => (
        <Link
          href={`https://www.cinefy.in/blogs/${row.url}`}
          target="_blank"
          className="text-primary hover:underline"
        >
          {row.url}
        </Link>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Blog) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Blog) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Blog>
      title="Blogs"
      description="Manage your blog posts and content"
      columns={columns}
      apiUrl="/blogs"
    />
  );
}
