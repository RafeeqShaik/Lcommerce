"use client";
import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    title: "Dashboard",
    href: "/admin",
    isExact: true,
  },
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Categories",
    href: "/admin/categories",
  },
];

export default function AdminAside() {
  const path = usePathname();

  return (
    <aside className="w-[250px] border-r min-h-screen overflow-y-auto bg-muted text-neutral-500 p-4">
      <h2 className="text-primary font-extrabold text-4xl my-5">LOGO</h2>
      <div className="flex flex-col gap-4">
        {routes.map(({ href, title, isExact }) => {
          const isActive = isExact ? href === path : path.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "border-l-4 border-transparent py-1 pl-2",
                isActive && "border-l-primary"
              )}
            >
              {title}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
