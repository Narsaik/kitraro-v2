import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { BackToTop } from "@/components/ui/BackToTop";
import { ToastContainer } from "@/components/ui/Toast";
import { PromoPopup } from "@/components/ui/PromoPopup";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
// import { ComingSoon } from "@/components/ui/ComingSoon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kit Raro | Streetwear de Luxo no Brasil",
  description: "A maior selecao de streetwear premium do Brasil. Nike, BAPE, New Era, Jordan e mais. Autenticidade garantida.",
  keywords: ["streetwear", "nike", "bape", "jordan", "new era", "sneakers", "brasil", "kit raro", "tenis", "bones", "moda"],
  authors: [{ name: "Kit Raro" }],
  creator: "Kit Raro",
  publisher: "Kit Raro",
  metadataBase: new URL("https://kitraro.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: "Kit Raro | Streetwear de Luxo no Brasil",
    description: "A maior selecao de streetwear premium do Brasil. Nike, BAPE, New Era, Jordan e mais. 100% Autentico.",
    url: "https://kitraro.com",
    siteName: "Kit Raro",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Kit Raro - Streetwear de Luxo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kit Raro | Streetwear de Luxo no Brasil",
    description: "A maior selecao de streetwear premium do Brasil. 100% Autentico.",
    images: ["/logo.png"],
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://kitraro.com/#organization",
                  "name": "Kit Raro",
                  "url": "https://kitraro.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://kitraro.com/logo.png",
                    "width": 800,
                    "height": 800,
                  },
                  "sameAs": [
                    "https://instagram.com/kitraro416",
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+55-11-99999-9999",
                    "contactType": "customer service",
                    "availableLanguage": "Portuguese",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://kitraro.com/#website",
                  "url": "https://kitraro.com",
                  "name": "Kit Raro",
                  "description": "A maior selecao de streetwear premium do Brasil",
                  "publisher": {
                    "@id": "https://kitraro.com/#organization",
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://kitraro.com/search?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Store",
                  "@id": "https://kitraro.com/#store",
                  "name": "Kit Raro",
                  "description": "Streetwear de luxo no Brasil - Nike, BAPE, Jordan, New Era",
                  "url": "https://kitraro.com",
                  "priceRange": "$$$$",
                  "currenciesAccepted": "BRL",
                  "paymentAccepted": "Credit Card, Debit Card, PIX, Boleto",
                  "areaServed": {
                    "@type": "Country",
                    "name": "Brazil",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider>
          {/* Scroll to top on navigation */}
          <ScrollToTop />

          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          >
            Pular para o conteudo principal
          </a>
          <Header />
          <main id="main-content" className="min-h-screen pb-20 lg:pb-0" tabIndex={-1}>{children}</main>
          <Footer />
          <MobileBottomNav />
          <CartDrawer />
          <BackToTop />
          <ToastContainer />
          <PromoPopup />
          <CookieConsent />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
