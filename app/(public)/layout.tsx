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
  description:
    "Sapore is Addis Ababa’s premier Italian restaurant offering authentic Italian dishes like lasagna, pasta, and wood-fired pizza. Experience true Italian flavors today.",
  openGraph: {
    title: "Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Taste authentic Italian cuisine at Sapore. Enjoy the best lasagna, pasta, and pizza in Addis Ababa with a cozy, family-friendly atmosphere.",
    url: "https://saporerestaurant.com",
    type: "restaurant",
    images: [
      {
        url: "https://saporerestaurant.com/hero-section.jpg",
        width: 1200,
        height: 630,
        alt: "Sapore - Authentic Italian Restaurant in Addis Ababa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Enjoy authentic Italian dishes including lasagna, pasta, and pizza at Sapore, Addis Ababa's favorite Italian spot.",
    images: ["https://saporerestaurant.com/hero-section.jpg"],
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
