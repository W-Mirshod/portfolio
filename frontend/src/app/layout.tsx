import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/lib/lenis-provider";

export const metadata: Metadata = {
  title: "Mirshod Qayimov (W-Mirshod)",
  description:
    "Mirshod Qayimov (W-Mirshod) – Senior Software Engineer specializing in Python/Django microservices, AI/ML integration, and cloud infrastructure. 20+ production systems, 99.7% uptime, IoT platforms & real-time applications.",
  metadataBase: new URL("https://w-mirshod.com"),
  openGraph: {
    title:
      "Mirshod Qayimov (W-Mirshod) – Senior Software Engineer, Python/Django Expert",
    description:
      "Senior Software Engineer specializing in Python/Django microservices, AI/ML integration, and cloud infrastructure.",
    images: ["/Mirshod-optimized.png"],
    url: "https://w-mirshod.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mirshod Qayimov (W-Mirshod) – Senior Software Engineer, Python/Django Expert",
    description:
      "Senior Software Engineer specializing in Python/Django microservices, AI/ML integration, and cloud infrastructure.",
    images: ["/Mirshod-optimized.png"],
  },
  icons: {
    icon: "/Mirshod-optimized.png",
    apple: "/Mirshod-optimized.png",
  },
};

export const viewport = {
  themeColor: "#0a0a0f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
