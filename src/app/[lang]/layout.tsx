import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { getDict, hasLocale, locales } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ChromeGate } from "@/components/chrome-gate";

// Dev-only "instant navigation" validation: every route here reads [lang]/[theme] params,
// so opt the whole segment out rather than wrapping each page in Suspense.
export const instant = false;

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDict(lang);
  return { title: d.meta.title, description: d.meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ChromeGate>
          <ScrollProgress />
          <Header lang={lang} d={d} />
        </ChromeGate>
        <ThemeSwitcher />
        <main className="flex-1">{children}</main>
        <ChromeGate>
          <Footer lang={lang} d={d} />
        </ChromeGate>
      </body>
    </html>
  );
}
