"use client";

import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import { UserNav } from "./user-nav";
import Breadcrumbs from "./ui/breadcrumbs";

const Layout = ({
  children,
  title,
  action,
}: {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div className="flex flex-col gap-2">
          <Breadcrumbs />
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            {title && <h3 className="text-lg leading-none ">{title}</h3>}
          </button>
        </div>
        <div className="flex-1" />
        {action && <div className="flex gap-2">{action}</div>}
        <div className="flex items-center gap-4">
          <UserNav />
        </div>
      </header>
      <main className="h-[calc(100vh-64px)] overflow-auto p-4">{children}</main>
    </>
  );
};

export default Layout;
