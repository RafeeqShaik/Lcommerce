import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` utility: Combines `clsx` for conditional classes and `twMerge` for Tailwind conflict resolution
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
