import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Link href="/" className="flex items-center py-1">
      <Image alt="logo" src="/logo-dash.png" height={50} width={200} />
    </Link>
  );
}
