import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProfile } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const profile = getProfile();

const siteTitle = `${profile.name} · Engineering Portfolio`;

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/avatars/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/avatars/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: siteTitle,
    title: siteTitle,
    description: profile.tagline,
    locale: "en_AU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.tagline,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="relative flex min-h-full flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header name={profile.name} />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer name={profile.name} email={profile.email} />
      </body>
    </html>
  );
}
