"use client";

import AdminForms from "@/forms/admin";
import { useCreateProductFormMethods } from "@/forms/admin/products/create-product-form";

export default function CreateProduct() {
  const { methods, onSubmit } = useCreateProductFormMethods();

  return (
    <div className="container">
      <AdminForms.Products.CreateProductForm
        methods={methods}
        onSubmit={onSubmit}
      />
    </div>
  );
}
