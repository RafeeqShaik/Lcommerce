import AdminAside from "@/components/admin/admin-aside";
import React from "react";

export default function AdminLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="flex h-screen">
      <AdminAside />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </main>
  );
}
