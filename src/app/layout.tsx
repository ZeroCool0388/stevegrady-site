import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { Effects } from "@/components/effects";
import "./globals.css";
const clash = localFont({
  src: [
    { path: "../../public/fonts/ClashDisplay-Semibold.woff2", weight: "600" },
    { path: "../../public/fonts/ClashDisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-clash",
  display: "swap",
  preload: true,
});
const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});
const description =
  "Steve Grady — Senior Technical Solutions Consultant. AI-native solution design, integrations and pre-sales, from discovery to go-live.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Steve Grady | AI-native solutions, built to work",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Steve Grady — AI-native solutions",
    description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.positioning}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steve Grady — AI-native solutions",
    description,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor: "#0b0d12" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${clash.variable} ${satoshi.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Effects />
        {children}
      </body>
    </html>
  );
}
