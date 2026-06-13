import type { RouteCategory } from "../types/templates";

export function isValidRouteCategory(value: string): value is RouteCategory {
  const valid: RouteCategory[] = [
    "web-development",
    "ui-ux-design",
    "branding",
    "logo-design",
    "publication",
    "writing",
    "gallery",
  ];
  return valid.includes(value as RouteCategory);
}
