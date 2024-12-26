"use client";

import AdminForms from "@/forms/admin";
import { useUpdateProductFormMethods } from "@/forms/admin/products/update-product-form";
import { useGetProductById } from "@/services/product";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditProduct() {
  const { productId } = useParams<{ productId: string }>();

  const { methods, onSubmit } = useUpdateProductFormMethods(productId);
  const { data: product } = useGetProductById(productId);

  useEffect(() => {
    if (!product) return;
    methods.setValue("name", product.name);
    methods.setValue("price", product.price);
    methods.setValue("category", product.category);
    methods.setValue("imageUrl", product.imageUrl);
  }, [methods, product]);

  if (!product) return <div>Product not found</div>;
  return (
    <div className="container">
      <AdminForms.Products.UpdateProductForm
        methods={methods}
        onSubmit={onSubmit}
      />
    </div>
  );
}
