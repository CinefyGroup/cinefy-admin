"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/auth-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import data from "@/data/permissions.json";

interface Permission {
  method: string;
  label: string;
  defaultChecked: boolean;
  accessibleUsers: string[];
}

interface PermissionSection {
  title: string;
  resource: string;
  path: string;
  permissions: Permission[];
}

interface UserPermissions {
  [key: string]: string[];
}

interface Props {
  role:
    | "super-admin"
    | "administrator"
    | "content-manager"
    | "customer-support"
    | "viewer";
  permissions?: UserPermissions;
  onPermissionsChange?: (permissions: UserPermissions) => void;
}

const Permissions = ({ role, permissions, onPermissionsChange }: Props) => {
  const { user } = useAuth();

  const permissionData = data.filter((section) => {
    // Super admin can see all sections
    if (user?.role === "super-admin") {
      return true;
    }

    // Check if user has any permissions for this section
    const userPermissions = user?.permissions as unknown as UserPermissions;
    if (!userPermissions) return false;

    // Check if user has permissions for this resource
    const hasResourcePermission = userPermissions[section.resource]?.length > 0;
    if (!hasResourcePermission) return false;

    // For admins, show all sections they have permissions for
    if (user?.role === "administrator") {
      return true;
    }

    // For other roles, check if they have any of the allowed methods
    return section.permissions.some((permission) =>
      userPermissions[section.resource]?.includes(permission.method)
    );
  });

  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(
      Object.entries(permissions || {}).flatMap(([resource, methods]) =>
        methods.map((method) => `${resource}:${method}`)
      )
    )
  );
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    console.warn("selectedPermissions", selectedPermissions);
    if (onPermissionsChange) {
      const resourcePermissions: UserPermissions = {};
      
      selectedPermissions.forEach((permission) => {
        const [resource, method] = permission.split(":");
        if (!resourcePermissions[resource]) {
          resourcePermissions[resource] = [];
        }
        resourcePermissions[resource].push(method);
      });

      onPermissionsChange(resourcePermissions);
      console.warn("resourcePermissions", resourcePermissions);
    }
  }, [selectedPermissions, onPermissionsChange]);

  const canGrantPermission = (resource: string, method: string) => {
    if (user?.role === "super-admin") return true;
    const userPermissions = user?.permissions as unknown as UserPermissions;
    return userPermissions[resource]?.includes(method) || false;
  };

  const handleSelectAll = (section: PermissionSection) => {
    const newPermissions = new Set(selectedPermissions);
    const allChecked = section.permissions.every((p) =>
      selectedPermissions.has(`${section.resource}:${p.method}`)
    );

    section.permissions.forEach((p) => {
      const permission = `${section.resource}:${p.method}`;
      if (allChecked) {
        newPermissions.delete(permission);
      } else {
        newPermissions.add(permission);
      }
    });

    setSelectedPermissions(newPermissions);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    const newPermissions = new Set(selectedPermissions);
    if (checked) {
      newPermissions.add(permission);
    } else {
      newPermissions.delete(permission);
    }
    setSelectedPermissions(newPermissions);
  };

  const getMethodBadgeVariant = (method: string) => {
    switch (method) {
      case "GET":
        return "default";
      case "POST":
        return "success";
      case "PATCH":
        return "secondary";
      case "DELETE":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>
            Manage access permissions for different sections of the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {permissionData.map((section) => {
                if (
                  section.title === "Admins Management" &&
                  role !== "administrator"
                ) {
                  return null;
                }
                return (
                  <div
                    key={`${section.resource}:${section.path}`}
                    className="space-y-4"
                    onMouseEnter={() => setSelectedSection(section.path)}
                    onMouseLeave={() => setSelectedSection(null)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`select-all-${section.resource}:${section.path}`}
                        checked={section.permissions.every((p) =>
                          selectedPermissions.has(`${section.resource}:${p.method}`)
                        )}
                        onCheckedChange={() => handleSelectAll(section)}
                      />
                      <label
                        htmlFor={`select-all-${section.resource}:${section.path}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {section.title}
                      </label>
                    </div>
                    <div className="ml-6 space-y-2">
                      {section.permissions.map((permission) => {
                        const permissionString = `${section.resource}:${permission.method}`;
                        if (
                          role === "administrator" ||
                          permission?.accessibleUsers?.includes(role)
                        ) {
                          return (
                            <div
                              key={permissionString}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={permissionString}
                                checked={selectedPermissions.has(
                                  permissionString
                                )}
                                onCheckedChange={(checked) =>
                                  handlePermissionChange(
                                    permissionString,
                                    checked as boolean
                                  )
                                }
                                disabled={
                                  !canGrantPermission(
                                    section.resource,
                                    permission.method
                                  )
                                }
                              />
                              <label
                                htmlFor={permissionString}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {permission.label}
                              </label>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Routes</CardTitle>
          <CardDescription>
            Available endpoints and their methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {permissionData.map((section) => (
                <div
                  key={`${section.resource}:${section.path}`}
                  className={`space-y-4 transition-opacity ${
                    selectedSection === section.path ||
                    permissions?.[section.resource]
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{section.title}</h3>
                    <Badge variant="outline">{section.path}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    {section.permissions.map((permission) => (
                      <Badge
                        key={`${permission.method}-${section.path}`}
                        variant={getMethodBadgeVariant(permission.method)}
                        className={`transition-opacity ${
                          permissions?.[section.resource]?.includes(
                            permission.method
                          )
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                      >
                        {permission.method}
                      </Badge>
                    ))}
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Permissions;
