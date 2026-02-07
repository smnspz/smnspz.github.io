
export enum Routes {
    Root = "/",
    Blog = "/blog",
    About = "/about"
}

export const navLinks = [
    { label: "Home", href: Routes.Root, match: (p: string) => p === "/" || p.startsWith(Routes.Blog) },
    { label: "About", href: Routes.About, match: (p: string) => p === Routes.About },
];
