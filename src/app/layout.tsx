import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { getExperiencePlusLabel } from "@/lib/experience";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://venkatverse.vercel.app";
const expPlus = getExperiencePlusLabel();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Venkatesan D — Lead Application Developer | PHP, CodeIgniter & Enterprise ERP",
    template: "%s | Venkatesan D",
  },
  description: `Lead Application Developer with ${expPlus} experience building enterprise ERP, LMS, HRMS & private AI systems (Ollama / vLLM). PHP 7/8, CodeIgniter 3/4, MySQL, React, Next.js, AWS. 3× promoted. Coimbatore, India.`,
  keywords: [
    "Lead Application Developer",
    "Lead PHP Developer India",
    "CodeIgniter ERP Developer",
    "Enterprise ERP Architect",
    "HRMS Payroll Software Developer",
    "LMS Integration Developer",
    "Private AI Ollama vLLM",
    "PHP MySQL Next.js Developer",
    "Coimbatore Full Stack Developer",
  ],
  authors: [{ name: "Venkatesan D", url: siteUrl }],
  creator: "Venkatesan D",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Venkatesan D — Lead Application Developer | PHP, ERP & AI",
    description: `${expPlus} · 3× promoted · 20+ ERP modules · PHP, CodeIgniter, MySQL, Next.js, AWS & private AI (Ollama / vLLM).`,
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
    title: "Venkatesan D — Lead Application Developer",
    description: `3× promoted · 20+ ERP modules · PHP, CodeIgniter, MySQL, Next.js, AWS & Ollama/vLLM.`,
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
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased" suppressHydrationWarning>
        <script
          id="strip-extension-attrs"
          dangerouslySetInnerHTML={{
            __html: `(function(){var attrs=["fdprocessedid","data-cursor-ref"];function stripEl(el){if(!el||el.nodeType!==1)return;for(var a=0;a<attrs.length;a++){if(el.hasAttribute(attrs[a]))el.removeAttribute(attrs[a]);}}function strip(root){stripEl(root);if(!root||!root.querySelectorAll)return;var nodes=root.querySelectorAll("[fdprocessedid],[data-cursor-ref]");for(var i=0;i<nodes.length;i++)stripEl(nodes[i]);}var obs=new MutationObserver(function(records){for(var i=0;i<records.length;i++){var rec=records[i];if(rec.type==="attributes"){stripEl(rec.target);}else if(rec.addedNodes){for(var j=0;j<rec.addedNodes.length;j++)strip(rec.addedNodes[j]);}}});obs.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:attrs});strip(document.documentElement);setTimeout(function(){obs.disconnect();},8000);})();`,
          }}
        />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
