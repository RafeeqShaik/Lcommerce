import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { useUpdateProductById } from "@/services/product";
import { errorHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
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
export const useUpdateProductFormMethods = (productId: string) => {
  const router = useRouter();

  const methods = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "",
      name: "",
      price: 0,
      imageUrl: "https://prd.place/400",
    },
  });

  const { mutateAsync } = useUpdateProductById(productId);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    await mutateAsync(data).catch(errorHandler);

    router.back();
    toast.success("Product saved successfully");
  };

  return { methods, onSubmit };
};

type UpdateProductFormProps = {
  methods: UseFormReturn<Form>;
  onSubmit: SubmitHandler<Form>;
};

export default function UpdateProductForm({
  methods,
  onSubmit,
}: UpdateProductFormProps) {
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
