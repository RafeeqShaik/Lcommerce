"use client";

import {
  FormField as FF,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = { label?: string } & React.InputHTMLAttributes<HTMLInputElement>;
export function FormField({ label, name, className, ...rest }: Props) {
  if (!name) throw new Error("name is required");

  return (
    <FF
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>Username</FormLabel>}
          <FormControl>
            <Input
              placeholder="shadcn"
              className={className}
              {...field}
              {...rest}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
