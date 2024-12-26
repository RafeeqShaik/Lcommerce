import { Product } from "@/@types";
import { productsAtom } from "@/atoms/product.atom";
import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { Save } from "lucide-react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z.coerce.number().positive(),
  category: z.string().nonempty(),
  imageUrl: z.string().nonempty({ message: "Image is required" }),
});

type Form = z.infer<typeof schema>;

// Methods
export const useCreateProductFormMethods = () => {
  const [, setProducts] = useAtom(productsAtom);

  const methods = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      name: "",
      price: 0,
      imageUrl: "https://prd.place/400",
    },
  });

  const onSubmit: SubmitHandler<Form> = (data) => {
    const uuid = crypto.randomUUID();
    const product: Product = {
      ...data,
      id: uuid,
      imageUrl: `${data.imageUrl}?r=${uuid}`,
    };

    setProducts((prev) => [...prev, product]);

    methods.reset();
    toast.success("Product created successfully");
  };

  return { methods, onSubmit };
};

type CreateProductFormProps = {
  methods: UseFormReturn<Form>;
  onSubmit: SubmitHandler<Form>;
};

export default function CreateProductForm({
  methods,
  onSubmit,
}: CreateProductFormProps) {
  return (
    <form
      className="grid grid-cols-2 gap-5"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <FormField name="name" placeholder="Enter product name" />
        <FormField
          name="price"
          placeholder="Enter price"
          type="number"
          min={1}
        />
        <div>
          <FormField name="category" placeholder="Select category" />
        </div>
        <Button className="col-span-2">
          <Save className="mr-1" />
          Save
        </Button>
      </FormProvider>
    </form>
  );
}
