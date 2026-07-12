import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { SITE_URL, BUSINESS_NAME } from "@/lib/site";

const HOUSECALL_PRO_TOKEN = "aa7451d2b83d45b0b709ab0328e1ca23";
const HOUSECALL_PRO_ORG_NAME = "HVA-Climate-Control-LLC";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DEFAULT_DESCRIPTION =
  "Licensed, bonded, and insured HVAC contractor serving Vancouver WA and Portland OR. Heating, air conditioning, ventilation, and commercial HVAC repair, installation, and maintenance.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${BUSINESS_NAME} | HVAC Repair, Installation & Maintenance`,
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    title: `${BUSINESS_NAME} | HVAC Repair, Installation & Maintenance`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} | HVAC Repair, Installation & Maintenance`,
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocalBusinessJsonLd />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src={`https://online-booking.housecallpro.com/script.js?token=${HOUSECALL_PRO_TOKEN}&orgName=${HOUSECALL_PRO_ORG_NAME}`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
