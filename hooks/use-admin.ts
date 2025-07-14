import { useQuery } from "@tanstack/react-query";
import api from "@/axios-instance";

interface UserPermissions {
  [key: string]: string[];
}

interface Admin {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role:
    | "super-admin"
    | "administrator"
    | "content-manager"
    | "customer-support"
    | "viewer";
  status: boolean;
  image?: string;
  permissions: UserPermissions;
  createdAt: string;
  last_login?: string;
}

export function useAdmin(id: string) {
  return useQuery({
    queryKey: ["admin", id],
    queryFn: async () => {
      const { data } = await api.get<Admin>(`/admins/${id}`);
      return data;
    },
    enabled: !!id,
  });
}
