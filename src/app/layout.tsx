import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500",  "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Venkatesan D | Lead Application Developer",
  description:
    "Professional portfolio of Venkatesan D — Lead Application Developer (since July 2021) specializing in PHP, CodeIgniter, ERP, React, AWS & AI. Based in Coimbatore, India.",
  keywords: ["PHP Developer", "CodeIgniter", "Lead Application Developer", "ERP", "Coimbatore", "React", "Next.js", "AWS"],
  authors: [{ name: "Venkatesan D" }],
  openGraph: {
    title: "Venkatesan D | Lead Application Developer",
    description: "Building enterprise ERP & web applications with PHP, CodeIgniter & AI since July 2021",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full`} data-theme="light" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground antialiased" suppressHydrationWarning>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
