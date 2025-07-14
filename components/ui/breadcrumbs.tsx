import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/dashboard"
        className="text-muted-foreground hover:text-foreground"
      >
        Home
      </Link>
      {paths.map((path, index) => (
        <div key={path} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link
            href={`/${paths.slice(0, index + 1).join("/")}`}
            className={`${
              index === paths.length - 1
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {path.charAt(0).toUpperCase() + path.slice(1)}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
