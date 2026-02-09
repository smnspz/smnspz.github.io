import { normalizePath } from "./lib/path_utils";

export enum Routes {
    Root = "/",
    Blog = "/blog",
    About = "/about"
}

export const navLinks = [
    { label: "Home", href: Routes.Root, match: (p: string) => normalizePath(p) === "/" || normalizePath(p).startsWith(Routes.Blog) },
    { label: "About", href: Routes.About, match: (p: string) => normalizePath(p) === Routes.About },
];
