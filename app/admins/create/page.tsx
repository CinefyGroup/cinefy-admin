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
import Layout from "@/components/component-layout";
import Permissions from "@/components/admin/permissions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, RefreshCcw } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";
import { toast } from "@/hooks/use-toast";
import api from "@/axios-instance";

interface UserPermissions {
  [key: string]: string[];
}

const adminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum([
    "administrator",
    "content-manager",
    "customer-support",
    "viewer",
  ]),
  isActive: z.boolean(),
  sendWelcomeEmail: z.boolean(),
  image: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

type AdminFormValues = z.infer<typeof adminSchema>;

export default function CreateAdminPage() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<UserPermissions>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localImage, setLocalImage] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, loading: isUploading, error } = useImageUpload();

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "administrator",
      isActive: true,
      sendWelcomeEmail: true,
      image: "",
    },
  });

  const handleImageSelect = useCallback((file: File) => {
    const preview = URL.createObjectURL(file);
    setLocalImage({ file, preview });
  }, []);

  const onSubmit = async (data: AdminFormValues) => {
    try {
      setIsSubmitting(true);

      // Upload image if there's a local image
      if (localImage) {
        const imageId = await uploadImage(localImage.file);
        if (!imageId) {
          toast({
            title: "Failed to upload image",
            description: error || "Image upload failed",
            variant: "destructive",
          });
          return;
        }
        data.image = imageId;
      }

      const adminData = {
        ...data,
        permissions,
      };

      const response = await api.post("/admins", adminData);

      if (response.status === 201) {
        // Clean up local image URL
        if (localImage) {
          URL.revokeObjectURL(localImage.preview);
        }

        toast({
          title: "Admin created successfully",
          description: "Admin created successfully",
        });
        router.push("/admins");
      } else {
        toast({
          title: "Failed to create admin",
          description: "Failed to create admin",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Failed to create admin",
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

  return (
    <Layout
      title="Create Admin"
      action={
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Admin"}
        </Button>
      }
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="w-full justify-start sticky -top-4 z-10 border-b">
            <TabsTrigger value="profile">Profile details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
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
                        <Input
                          id="name"
                          placeholder="Enter full name"
                          {...form.register("name")}
                        />
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
                          placeholder="Enter email address"
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
                        <Label htmlFor="password">Create Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter new password"
                          {...form.register("password")}
                        />
                        <p className="text-xs text-muted-foreground">
                          Leave blank to auto generate password
                        </p>
                        {form.formState.errors.password && (
                          <p className="text-sm text-red-500">
                            {form.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2 flex items-center">
                        <Button
                          variant="outline"
                          type="button"
                          size="sm"
                          onClick={() => {
                            const password = Math.random()
                              .toString(36)
                              .substring(2, 15);
                            form.setValue("password", password);
                          }}
                        >
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Generate Password
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="Enter phone number"
                          {...form.register("phone")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">
                          Role <span className="text-red-500">*</span>
                        </Label>
                        <Select
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
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="sendWelcomeEmail"
                          checked={form.watch("sendWelcomeEmail")}
                          onCheckedChange={(checked) =>
                            form.setValue("sendWelcomeEmail", checked)
                          }
                        />
                        <Label htmlFor="sendWelcomeEmail">
                          Send welcome email
                        </Label>
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
                        <AvatarImage
                          src={localImage?.preview || ""}
                          alt="Admin"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageSelect(file);
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        type="button"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Change Image
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      upload image with square 1:1 aspect ratio for best fit and
                      resolution
                    </p>
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
        </Tabs>
      </form>
    </Layout>
  );
}
