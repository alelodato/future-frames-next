import "./globals.css";
import "aos/dist/aos.css";
import Script from "next/script";
import ConditionalLayout from "@/components/ConditionalLayout";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopBtn";
import AOSInit from "@/components/AOSInit";
import { CookieConsentProvider } from "@/components/CookieConsentProvider";
import CookieBanner from "@/components/CookieBanner";

export const metadata = {
  metadataBase: new URL("https://futureframes.it"),
  title: {
    default: "Future Frames — Fotografia & Videomaking a Roma",
    template: "%s — Future Frames",
  },
  description: "Agenzia creativa specializzata in fotografia e videomaking a Roma. Spot aziendali, eventi, podcast, food, fashion e post-produzione.",
  keywords: ["fotografia Roma", "videomaking Roma", "agenzia video Pomezia", "spot aziendale", "fotografo eventi Roma", "video aziendale"],
  authors: [{ name: "Future Frames" }],
  creator: "Future Frames",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://futureframes.it",
    siteName: "Future Frames",
    title: "Future Frames — Fotografia & Videomaking a Roma",
    description: "Agenzia creativa specializzata in fotografia e videomaking a Roma.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Future Frames" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Frames — Fotografia & Videomaking a Roma",
    description: "Agenzia creativa specializzata in fotografia e videomaking a Roma.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "XtJ-ZLwCQXbhvQJTO5X2ZGklVT0Kuz6eb4GpCng6GHM"
  },
  icons: {
    icons: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&display=swap"
          rel="stylesheet"
        />
        {/* FontAwesome */}
        <Script
          src="https://kit.fontawesome.com/d2f8b724df.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <AOSInit />
        <ScrollToTop />
        <ScrollToTopButton />
        <ConditionalLayout>
          <CookieConsentProvider>
            {children}
            <CookieBanner />
          </CookieConsentProvider>
        </ConditionalLayout>
      </body>
    </html>
  );
}
