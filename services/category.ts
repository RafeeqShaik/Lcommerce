import { Category } from "@/@types";
import { categoryAtom } from "@/atoms/category.atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const useCreateCategoryMutation = () => {
  const [categories, setCategories] = useAtom(categoryAtom);

  return useMutation({
    mutationFn: async (payload: Category) => {
      if (
        categories.some(
          (c) => c.name.toLowerCase() === payload.name.toLowerCase()
        )
      )
        throw new Error("Category already exists");

      setCategories((prev) => [...prev, payload]);
    },
  });
};
