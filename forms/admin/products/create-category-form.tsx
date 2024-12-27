import { FormField } from "@/components/form/form-field";
import { Button } from "@/components/ui/button";
import { useCreateCategoryMutation } from "@/services/category";
import { errorHandler } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const schema = z.object({
  name: z.string().nonempty({ message: "Category is required" }),
  imageUrl: z.string({ message: "Image URL is required" }),
});

type Form = z.infer<typeof schema>;

type CreateCategoryFormProps = {
  methods: UseFormReturn<Form>;
  onSubmit: SubmitHandler<Form>;
};

export const useCreateCategoryFormMethods = () => {
  const methods = useForm<Form>({
    defaultValues: {
      name: "",
      imageUrl: "https://prd.place/400",
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync } = useCreateCategoryMutation();

  const id = crypto.randomUUID();
  const onSubmit: SubmitHandler<Form> = async (data) => {
    await mutateAsync({
      ...data,
      id,
      imageUrl: `${data.imageUrl}?r=${id}`,
    })
      .then(() => {
        methods.reset();
        toast.success("Category created successfully");
      })
      .catch(errorHandler);
  };

  return { methods, onSubmit };
};

export default function CreateCategoryForm({
  methods,
  onSubmit,
}: CreateCategoryFormProps) {
  return (
    <form
      className="grid grid-cols-2 gap-4 max-w-xl"
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <FormProvider {...methods}>
        <FormField
          name="name"
          label="Category name"
          placeholder="Enter category name"
        />
      </FormProvider>
      <Button className="col-span-2">Save</Button>
    </form>
  );
}
