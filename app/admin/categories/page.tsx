import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="container">
      <Button className="float-right" asChild>
        <Link href="/admin/categories/create">
          <Plus className="size-4 mr-1" />
          Create Category
        </Link>
      </Button>
    </div>
  );
}
