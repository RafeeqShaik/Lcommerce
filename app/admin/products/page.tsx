"use client";

import { productsAtom } from "@/atoms/product.atom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAtom } from "jotai";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [products] = useAtom(productsAtom);

  return (
    <div className="container">
      <div className="flex justify-end">
        <Button asChild>
          <Link className="" href={"/admin/products/create"}>
            <Plus className="size-4 mr-1" />
            Create
          </Link>
        </Button>
      </div>

      {/* Products */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(({ category, id, imageUrl, name, price }) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={imageUrl}
                    alt="product-image"
                  />
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>{category}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
