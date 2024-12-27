import { Category } from "@/@types";
import { atomWithStorage } from "jotai/utils";

export const categoryAtom = atomWithStorage<Category[]>("categories", []);
