import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "@/components/ui/sonner";
import { ContactAgent } from "@/components/organisms/contact-agent";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://technocrat.ng"),
  title: {
    default:
      "Technocrat Nigeria - Computers, Solar Systems, Generators, and Electronics",
    template: "%s | Technocrat Nigeria",
  },
  description:
    "Technocrat Nigeria is your trusted source for high-quality computers, solar systems, generators, and electronics. We offer a wide range of products to meet your technology needs, backed by exceptional customer service and support.",
  keywords: [
    "computers",
    "laptops",
    "solar systems",
    "generators",
    "electronics",
    "Nigeria",
    "tech store",
    "Technocrat",
  ],
  authors: [{ name: "Technocrat Nigeria" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Technocrat Nigeria",
    title:
      "Technocrat Nigeria - Computers, Solar Systems, Generators, and Electronics",
    description:
      "Your trusted source for high-quality computers, solar systems, generators, and electronics in Nigeria.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Technocrat Nigeria - Computers, Solar Systems, Generators, and Electronics",
    description:
      "Your trusted source for high-quality computers, solar systems, generators, and electronics in Nigeria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${jetbrains.variable} antialiased`}>
        <StoreProvider>
          {children}
          <Toaster />
          <ContactAgent />
          <Analytics />
          <SpeedInsights />
        </StoreProvider>
      </body>
    </html>
  );
}
