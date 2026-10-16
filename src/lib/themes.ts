export const themes = ["theme-1", "theme-2", "theme-3"] as const;
export type Theme = (typeof themes)[number];
export const hasTheme = (t: string): t is Theme => (themes as readonly string[]).includes(t);
