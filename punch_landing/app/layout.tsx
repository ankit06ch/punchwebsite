import "./css/style.css";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Punch - Digital Loyalty Rewards App",
  description: "Punch is a modern loyalty app that rewards people for visiting their favorite local spots. Earn digital punches and unlock exclusive rewards at local businesses.",
  icons: {
    icon: "/images/Punch_T/iconT.png",
  },
  verification: {
    google: "J6Lt8OPl0Hkyc2SiBTdxX-M2BgcZYbRA6NCD3HNDnHI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B8NDKDG8VP"
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B8NDKDG8VP');
          `}
        </Script>
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
