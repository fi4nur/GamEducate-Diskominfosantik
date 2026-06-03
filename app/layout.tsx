import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gameducate — Belajar Literasi Digital Lewat Game Seru",
  description:
    "Belajar keamanan internet, cara mengenali hoax, dan etika digital lewat game seru. Gratis dan tanpa daftar!",
  manifest: "/manifest.json",
  keywords: [
    "literasi digital",
    "edukasi",
    "game edukasi",
    "keamanan internet",
    "hoaks",
    "etika digital",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1a27c9" />
      </head>
      <body className="antialiased">
        {children}
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js')
                .then(() => console.log('SW registered'))
                .catch(err => console.log('SW failed:', err));
            }
          `,
          }}
        />
      </body>
    </html>
  );
}
