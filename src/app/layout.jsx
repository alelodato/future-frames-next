import "./globals.css";
import "aos/dist/aos.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopBtn";
import AOSInit from "@/components/AOSInit";

export const metadata = {
  title: "Future Frames – Fotografia e Videomaking Professionale",
  description:
    "Agenzia creativa specializzata in fotografia e videomaking professionale. Raccontiamo persone, aziende ed eventi con un linguaggio visivo pulito, emotivo e contemporaneo.",
  icons: {
    icon: [
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  manifest: '/images/site.webmanifest',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
