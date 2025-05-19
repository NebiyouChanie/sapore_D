import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import Footer from "@/components/usercomponents/Footer";
import { Toaster } from "sonner";

 

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Sapore | Best Italian Restaurant in Addis Ababa",
    template: "%s - Sapore",
  },
  description: "Sapore is Addis Ababa’s premier Italian restaurant, known for its authentic flavors and the best lasagna in the city. Experience the true taste of Italy today.",
  keywords: "best Italian restaurant Addis, lasagna in Addis Ababa, Italian food Ethiopia, Sapore menu, pasta and pizza Addis",
  openGraph: {
    title: "Sapore | Best Italian Restaurant in Addis Ababa",
    description: "Taste the finest Italian cuisine in Addis Ababa. Sapore is home to the city's most beloved lasagna and a menu full of traditional favorites.",
    url: "https://saporerestaurant.com",
    type: "website",
    images: [
      {
        url: "https://saporerestaurant.com/public/hero-section.jpg",
        width: 1200,
        height: 630,
        alt: "Sapore - Authentic Italian Restaurant in Addis Ababa",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
      >
       <Toaster position="top-right" richColors />
        {children}
        <Footer />
      </body>
    </html>
  );
}
