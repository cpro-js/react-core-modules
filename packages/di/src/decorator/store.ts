import { injectable } from "inversify";

// note: export const instead of export {} seems to be better for renaming re-exports (auto import works better in IDEA)
export const store = injectable;
