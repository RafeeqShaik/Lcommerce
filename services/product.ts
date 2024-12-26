import { Product } from "@/@types";
import { productsAtom } from "@/atoms/product.atom";
import { useAtom } from "jotai";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProductById = (productId: string) => {
  const [products] = useAtom(productsAtom);

  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      return products.find((product) => product.id === productId);
    },
  });
};

// export const useUpdateProductById = (
//   productId: string,
//   payload: Partial<Product>
// ) => {
//   const [, setProducts] = useAtom(productsAtom);

//   const product = useGetProductById(productId);
//   if (!product) return toast.error("Product not found");

//   setProducts((prev) => {
//     return prev.map((p) => {
//       if (p.id === productId) {
//         return {
//           ...p,
//           ...payload,
//         };
//       }
//       return p;
//     });
//   });
// };

export const useUpdateProductById = (productId: string) => {
  const [, setProducts] = useAtom(productsAtom);
  const product = useGetProductById(productId);

  return useMutation({
    mutationFn: async (payload: Partial<Product>) => {
      if (!product) return toast.error("Product not found");

      setProducts((prev) => {
        return prev.map((p) => {
          if (p.id === productId) {
            return {
              ...p,
              ...payload,
            };
          }
          return p;
        });
      });
    },
  });
};

export const useDeleteProductById = () => {
  const [products, setProducts] = useAtom(productsAtom);

  return useMutation({
    mutationFn: async (productId: string) => {
      const product = products.find((product) => product.id === productId);
      if (!product) return toast.error("Product not found");
      setProducts((prev) => {
        return prev.filter((p) => p.id !== productId);
      });
    },
  });
};
