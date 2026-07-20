import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getProfile } from "@/lib/content";
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
