import "./css/style.css";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Punch - Digital Loyalty Rewards App",
  description: "Punch is a modern loyalty app that rewards people for visiting their favorite local spots. Earn digital punches and unlock exclusive rewards at local businesses.",
  icons: {
    icon: "/images/Punch_T/black_logo.png",
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
        <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </body>
    </html>
  );
}
