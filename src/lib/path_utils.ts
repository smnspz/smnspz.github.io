// Strip trailing slash for consistent path matching (except root "/")
export const normalizePath = (p: string) => p === "/" ? p : p.replace(/\/$/, "");
