import Head from "next/head";
import Header from '@/components/usercomponents/Home-Header';
import FoodGallery from "@/components/usercomponents/FoodGrid";
import HeroSection from "@/components/usercomponents/HeroSection";
import AboutusSection from "@/components/usercomponents/Aboutus-Section";
import SpecialsSection from "@/components/usercomponents/SpecialsSection";
import MenuSection from "@/components/usercomponents/Menu-section";
import LocationSection from "@/components/usercomponents/LocationSection";
import TestimonialSection from "@/components/usercomponents/TestimonialSection";
import BookingSection from "@/components/usercomponents/BookingSection";

import { getSpecialItems } from "@/lib/menu";

export const dynamic = "force-dynamic";

export default async function Home() {
  const specialItems = await getSpecialItems();

  // JSON-LD structured data for Restaurant homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Sapore",
    "image": [
      "https://saporerestaurant.com/public/hero-section.jpg"
    ],
    "url": "https://saporerestaurant.com",
    "telephone": "+251911439712",
    "address": {
      "streetAddress": "Zimbabwe Street, Bole",
      "addressLocality": "Addis Ababa",
      "addressRegion": "Addis Ababa",
      "addressCountry": "ET"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "07:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "11:00",
        "closes": "22:00"
      }
    ],
    "servesCuisine": "Italian",
    "priceRange": "$$",
    "sameAs": [
      "https://www.instagram.com/sapore.restaurant"
    ]
  };

  return (
    <>
      <Head>
        <title>Sapore | Best Italian Restaurant in Addis Ababa</title>
        <meta
          name="description"
          content="Experience authentic Italian cuisine at Sapore, Addis Ababa’s premier Italian restaurant. Enjoy delicious lasagna, handmade pasta, wood-fired pizza, and warm hospitality."
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Sapore | Best Italian Restaurant in Addis Ababa" />
        <meta
          property="og:description"
          content="Experience authentic Italian cuisine at Sapore, Addis Ababa’s premier Italian restaurant. Enjoy delicious lasagna, handmade pasta, wood-fired pizza, and warm hospitality."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saporerestaurant.com" />
        <meta
          property="og:image"
          content="https://saporerestaurant.com/public/hero-section.jpg"
        />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sapore | Best Italian Restaurant in Addis Ababa" />
        <meta
          name="twitter:description"
          content="Experience authentic Italian cuisine at Sapore, Addis Ababa’s premier Italian restaurant. Enjoy delicious lasagna, handmade pasta, wood-fired pizza, and warm hospitality."
        />
        <meta
          name="twitter:image"
          content="https://saporerestaurant.com/public/hero-section.jpg"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* About Us Section */}
          <AboutusSection />

          {/* Our Specials Section */}
          <SpecialsSection specialItems={specialItems} />

          {/* Our Menu Section */}
          <MenuSection />

          {/* Gallery Section */}
          <section id="gallery" className="">
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
              <FoodGallery />
            </div>
          </section>

          {/* Location Section */}
          <LocationSection />

          {/* Testimonials Section */}
          <TestimonialSection />

          {/* Booking Section */}
          <BookingSection />
        </main>
      </div>
    </>
  );
}
