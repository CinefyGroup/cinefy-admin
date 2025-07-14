"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Building2,
  Home,
  LayoutDashboard,
  Settings,
  Tag,
  FileText,
  MessageSquare,
  Users,
  FolderKanban,
  HelpCircle,
  User,
  FileStack,
  Image,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { useAuth } from "@/context/auth-context";

const menuItems = [
  {
    group: "Casting Calls",
    items: [
      { href: "/casting-calls", label: "Casting Calls", icon: Newspaper },
    ],
  },
  {
    group: "Property Management",
    items: [
      { href: "/projects", label: "Projects", icon: Home },
      { href: "/categories", label: "Categories", icon: FolderKanban },
      { href: "/builders", label: "Builders", icon: Building2 },
      { href: "/tags", label: "Tags", icon: Tag },
      { href: "/sections", label: "Sections", icon: FileStack },
    ],
  },
  {
    group: "Content Management",
    items: [
      { href: "/blogs", label: "Blogs", icon: FileText },
      { href: "/banners", label: "Banners", icon: Image },
    ],
  },
  {
    group: "User Management",
    items: [
      { href: "/enquiries", label: "Enquiries", icon: MessageSquare },
      { href: "/admins", label: "Admins", icon: Users },
    ],
  },
  {
    group: "Settings",
    items: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/help", label: "Help", icon: HelpCircle },
    ],
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();

  function getPermissionKey(href: string) {
    // Remove leading slash and split by '/' to get the first segment
    return href.replace(/^\//, "").split("/")[0];
  }

  const allowedMenuItems =
    user?.role === "super-admin"
      ? menuItems
      : menuItems
          .map((group) => {
            const filteredItems = group.items.filter((item) => {
              if (group.group === "Settings") return true;
              const key = getPermissionKey(item.href);
              const perms = (user?.permissions?.[
                key as keyof typeof user.permissions
              ] || []) as string[];
              return perms.includes("GET");
            });
            // Only include group if it has at least one allowed item
            return filteredItems.length > 0
              ? { ...group, items: filteredItems }
              : null;
          })
          .filter(Boolean);
          
  // Don't apply dashboard layout to login page
  if (pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-screen">
        <Sidebar>
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <Logo />
              <SidebarSeparator />
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                        pathname === "/dashboard"
                          ? "bg-accent text-accent-foreground"
                          : ""
                      }`}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarGroupContent>
                </SidebarGroup>

                {allowedMenuItems.map((group) => (
                  <SidebarGroup key={group?.group}>
                    <SidebarGroupLabel>
                      <span className="text-xs font-medium text-muted-foreground">
                        {group?.group}
                      </span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      {group?.items?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                            pathname === item.href
                              ? "bg-accent text-accent-foreground"
                              : ""
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </div>
            <div className="mt-auto border-t p-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
