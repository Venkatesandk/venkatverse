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
  title: "Venkatesan D | Full Stack PHP Developer",
  description:
    "Professional portfolio of Venkatesan D — Full Stack Developer with 4.9 years of experience in PHP, CodeIgniter, React, AWS & AI. Based in Coimbatore, India.",
  keywords: ["PHP Developer", "Laravel", "Full Stack Developer", "Coimbatore", "React", "Next.js"],
  authors: [{ name: "Venkatesan D" }],
  openGraph: {
    title: "Venkatesan D | Senior Full Stack PHP Developer",
    description: "Building scalable web applications with PHP, React & AI",
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
