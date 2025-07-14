"use client";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Admin {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "super-admin" | "administrator" | "moderator" | "content-manager";
  status: boolean;
  last_login?: string;
  createdAt: string;
}

const getRoleBadgeVariant = (role: Admin["role"]) => {
  switch (role) {
    case "super-admin":
      return "destructive";
    case "administrator":
      return "default";
    case "moderator":
      return "secondary";
    case "content-manager":
      return "secondary";
    default:
      return "outline";
  }
};

export default function AdminsPage() {
  const columns = [
    {
      header: "Admin",
      accessorKey: "name",
      cell: (row: Admin) => (
        <div className="flex items-center gap-3">
          <Avatar>
            {row.image ? (
              <AvatarImage src={row.image || ""} alt={row.name} />
            ) : null}
            <AvatarFallback>
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (row: Admin) => (
        <Badge variant={getRoleBadgeVariant(row.role)}>
          {row.role
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Badge>
      ),
    },
    {
      header: "Last Login",
      accessorKey: "last_login",
      cell: (row: Admin) =>
        row.last_login ? (
          new Date(row.last_login).toLocaleString()
        ) : (
          <span className="text-muted-foreground">Never</span>
        ),
      sortable: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (row: Admin) => (
        <Badge variant={row.status ? "success" : "destructive"}>
          {row.status ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Created",
      accessorKey: "createdAt",
      cell: (row: Admin) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <DataTable
      title="Admins"
      description="Manage system administrators and their permissions"
      columns={columns}
      apiUrl="/admins"
    />
  );
}
