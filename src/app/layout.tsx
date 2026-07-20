import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProfile } from "@/lib/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const profile = getProfile();

export const metadata: Metadata = {
  title: {
    default: `${profile.name} · Engineering Portfolio`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  metadataBase: new URL("http://localhost:3000"),
  icons: {
    icon: [
      { url: "/avatars/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/avatars/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrains.variable} h-full`}>
      <body className="relative flex min-h-full flex-col antialiased">
        <div className="noise" aria-hidden="true" />
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
