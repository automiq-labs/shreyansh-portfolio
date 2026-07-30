import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shreyansh Kanoongo — AI Systems Builder",
  description: "I build AI systems that run real businesses: automation, dashboards, and full-stack applications. 15 systems built, 9 live in production. Jaipur, India.",
  openGraph: {
    title: "Shreyansh Kanoongo — AI Systems Builder",
    description: "I build AI systems that run real businesses: automation, dashboards, and full-stack applications. 15 systems built, 9 live in production. Jaipur, India.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
