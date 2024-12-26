import { Product } from "@/@types";
import { atomWithStorage } from "jotai/utils";

export const productsAtom = atomWithStorage<Product[]>("products", []);
