import { UserConfig } from "vite";


export const createViteConfig = (dirname: string) => UserConfig;
export const createLibraryViteConfig = (dirname: string, options: { bundleModules?: string[] }) => UserConfig;
