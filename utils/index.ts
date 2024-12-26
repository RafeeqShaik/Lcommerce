import clsx from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

// `cn` utility: Combines `clsx` for conditional classes and `twMerge` for Tailwind conflict resolution
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const errorHandler = (err: unknown) => {
  if (!(err instanceof Error)) return console.error(err);

  // sentry
  toast.error(err.message);
};
