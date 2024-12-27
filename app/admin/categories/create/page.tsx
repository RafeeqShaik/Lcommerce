"use client";

import AdminForms from "@/forms/admin";
import { useCreateCategoryFormMethods } from "@/forms/admin/products/create-category-form";

export default function Categories() {
  const formMethods = useCreateCategoryFormMethods();

  return (
    <div className="container">
      <AdminForms.Products.CreateCategoryForm {...formMethods} />
    </div>
  );
}
