"use client";

import { Mail, Phone, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";

interface Enquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: "property" | "general" | "support";
  message: string;
  property?: {
    _id: string;
    title: string;
  };
  status: "pending" | "contacted" | "resolved" | "spam";
  createdAt: string;
  updatedAt: string;
}

const getStatusBadgeVariant = (status: Enquiry["status"]) => {
  switch (status) {
    case "pending":
      return "secondary";
    case "contacted":
      return "default";
    case "resolved":
      return "success";
    case "spam":
      return "destructive";
    default:
      return "outline";
  }
};

export default function EnquiriesPage() {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (row: Enquiry) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span>{row.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{row.phone}</span>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: (row: Enquiry) => (
        <Badge variant="outline">
          {row?.type?.charAt(0)?.toUpperCase() + row?.type?.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Property",
      accessorKey: "property",
      cell: (row: Enquiry) =>
        row.property ? (
          <Link
            href={`/projects/${row.property._id}`}
            className="flex items-center text-primary hover:underline"
          >
            <LinkIcon className="h-3 w-3 mr-1" />
            {row.property.title}
          </Link>
        ) : (
          <span className="text-muted-foreground">-</span>
        ),
    },
    {
      header: "Message",
      accessorKey: "message",
      cell: (row: Enquiry) => (
        <div className="max-w-xs truncate">{row.message}</div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Enquiry) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {row?.status?.charAt(0)?.toUpperCase() + row?.status?.slice(1)}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Enquiry) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      header: "Last Updated",
      accessorKey: "updatedAt",
      cell: (row: Enquiry) => new Date(row.updatedAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable<Enquiry>
      title="Enquiries"
      description="Manage customer enquiries and support requests"
      columns={columns}
      apiUrl="/enquiries"
    />
  );
}
