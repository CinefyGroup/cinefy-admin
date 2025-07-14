"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/component-layout";
import Permissions from "@/components/admin/permissions";
import { useAdmin } from "@/hooks/use-admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/axios-instance";
import { useRouter } from "next/navigation";

const adminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().refine((val) => val === "" || val.length >= 6, {
    message: "Password must be at least 6 characters",
  }),
  phone: z.string().optional(),
  role: z.enum([
    "administrator",
    "content-manager",
    "customer-support",
    "viewer",
  ]),
  isActive: z.boolean(),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface UserPermissions {
  [key: string]: string[];
}

export default function EditAdminPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: admin, isLoading, error } = useAdmin(params.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissions, setPermissions] = useState<UserPermissions>({});

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
  });

  useEffect(() => {
    if (admin) {
      form.reset({
        name: admin.name,
        email: admin.email,
        password: "",
        phone: admin.phone || "",
        role: admin.role as
          | "administrator"
          | "content-manager"
          | "customer-support"
          | "viewer",
        isActive: admin.status,
      });
      setPermissions(admin.permissions);
    }
  }, [admin, form]);

  const onSubmit = async (data: AdminFormValues) => {
    try {
      setIsSubmitting(true);

      const response = await api.patch(`/admins/${params.id}`, {
        ...data,
        permissions,
      });

      console.log(response);

      if (response.status === 200) {
        toast({
          title: "Admin updated successfully",
          description: "Admin details have been updated",
        });
        router.push("/admins");
      } else {
        toast({
          title: "Failed to update admin",
          description: "Failed to update admin details",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to update admin",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading admin details</div>;
  }

  if (!admin) {
    return <div>Admin not found</div>;
  }

  return (
    <Layout
      title="Edit Admin"
      action={
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="w-full justify-start sticky -top-4 z-10 border-b">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 space-y-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Edit admin user details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="name" {...form.register("name")} />
                        {form.formState.errors.name && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter new password"
                          {...form.register("password")}
                        />
                        {form.formState.errors.password ? (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.password.message}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Leave blank to keep current password
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" {...form.register("phone")} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">
                          Role <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          defaultValue={admin?.role}
                          value={form.watch("role")}
                          onValueChange={(value) =>
                            form.setValue("role", value as any)
                          }
                        >
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrator">
                              Administrator
                            </SelectItem>
                            <SelectItem value="content-manager">
                              Content Manager
                            </SelectItem>
                            <SelectItem value="customer-support">
                              Customer Support
                            </SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isActive"
                          checked={form.watch("isActive")}
                          onCheckedChange={(checked) =>
                            form.setValue("isActive", checked)
                          }
                        />
                        <Label htmlFor="isActive">Active</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-5">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Image</CardTitle>
                    <CardDescription>
                      Update admin profile picture
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={admin.image || ""} alt="Admin" />
                        <AvatarFallback>
                          {admin.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Image
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Account details and status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Account Created
                        </span>
                        <span>
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Last Login
                        </span>
                        <span>
                          {admin.last_login
                            ? new Date(admin.last_login).toLocaleString()
                            : "Never"}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Delete User
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Permissions
              role={form.watch("role")}
              permissions={permissions}
              onPermissionsChange={setPermissions}
            />
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent admin user activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Resource</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Login</TableCell>
                        <TableCell>Admin Panel</TableCell>
                        <TableCell>192.168.1.1</TableCell>
                        <TableCell>2 hours ago</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Layout>
  );
}
