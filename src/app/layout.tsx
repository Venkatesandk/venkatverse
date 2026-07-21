import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { JsonLd } from "@/components/seo/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://venkatverse.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Venkatesan D | Lead Application Developer — PHP, CodeIgniter, ERP & AI",
    template: "%s | Venkatesan D",
  },
  description:
    "Lead Application Developer with 5+ years experience building enterprise ERP, HRMS, and AI-enabled systems using PHP, CodeIgniter, Next.js, MySQL & AWS. Based in Coimbatore, India. Available for hire.",
  keywords: [
    "Lead Application Developer",
    "PHP Developer",
    "CodeIgniter",
    "ERP Developer",
    "HRMS",
    "Next.js",
    "Coimbatore",
    "AWS",
    "AI Integration",
    "Hire PHP Developer",
  ],
  authors: [{ name: "Venkatesan D", url: siteUrl }],
  creator: "Venkatesan D",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Venkatesan D | Lead Application Developer",
    description:
      "5+ years · PHP · CodeIgniter · Next.js · ERP Solutions · AI Integration. Hire a Lead Application Developer.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Venkatverse",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Venkatesan D — Lead Application Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkatesan D | Lead Application Developer",
    description: "PHP · CodeIgniter · Next.js · ERP · AI — 5+ years experience. Available for hire.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
