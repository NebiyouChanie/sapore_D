import * as motion from "motion/react-client";
import Header from "@/components/usercomponents/Header";
import Link from "next/link";
import LocationCarousel from "@/components/usercomponents/LocationCarousel";

// --- SEO Metadata for Next.js App Router ---
export const metadata = {
  title: "Location - Sapore | Best Italian Restaurant in Addis Ababa",
  description:
    "Find Sapore Italian Restaurant located in Bole on Zimbabwe Street, Addis Ababa. Easily accessible by bus or taxi with ample parking. Call +251 91 143 9712 to book a table.",
  openGraph: {
    title: "Location - Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Find Sapore Italian Restaurant located in Bole on Zimbabwe Street, Addis Ababa. Easily accessible by bus or taxi with ample parking. Call +251 91 143 9712 to book a table.",
    keywords: [
      "Italian restaurant Bole Addis Ababa",
      "restaurants near Zimbabwe Street Addis Ababa",
      "Italian restaurants near me Addis Ababa",
      "Sapore location Addis Ababa",
      "how to get to Sapore Addis Ababa",
      "parking Italian restaurant Addis"
    ].join(", "),

    url: "https://saporerestaurant.com/location",
    type: "website",
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
    title: "Location - Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Find Sapore Italian Restaurant located in Bole on Zimbabwe Street, Addis Ababa. Easily accessible by bus or taxi with ample parking. Call +251 91 143 9712 to book a table.",
    images: ["https://saporerestaurant.com/hero-section.jpg"],
  },
};

export default function Location() {
  return (
    <>
      {/* JSON-LD Structured Data for Restaurant Location */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: "Sapore",
            image: "https://saporerestaurant.com/hero-section.jpg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Zimbabwe Street, Bole",
              addressLocality: "Addis Ababa",
              addressRegion: "Addis Ababa",
              addressCountry: "ET",
            },
            telephone: "+251911439712",
            url: "https://saporerestaurant.com",
            geo: {
              "@type": "GeoCoordinates",
              latitude: 8.9903271,
              longitude: 38.7825205,
            },
            hasMap:
              "https://www.google.com/maps/place/Sapore+Restaurant/@8.9903271,38.7825205,17z",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "07:30",
                closes: "22:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "11:00",
                closes: "22:00",
              },
            ],
            servesCuisine: "Italian",
          }),
        }}
      />

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* Location Hero Section */}
          <motion.section
            className="pt-36 md:pt-36 xl:pt-48 pb-16 md:pb-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
              <motion.article
                className="mb-16"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="flex flex-col xl:flex-row xl:gap-8 xl:items-center">
                  <motion.h1
                    className="font-playfair text-4xl md:text-6xl xl:text-[90px] mb-6 xl:mb-0"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                  >
                    Location
                  </motion.h1>
                  <motion.p
                    className="text-gray-500 font-light text-[18px] lg:max-w-[600px]"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    Located in Bole on Zimbabwe Street, Sapore Restaurant is a welcoming
                    place for meals with family, friends, or special events. It&apos;s
                    easy to reach by bus or taxi, and has good parking space. Call +251
                    91 143 9712 to book a table.
                  </motion.p>
                </div>
              </motion.article>

              <motion.figure
                className="relative w-full h-[300px] md:h-[400px] overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1217.3897886496147!2d38.78252046166136!3d8.990327096942769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b857383d8db3b%3A0x71c62f42ce8ff2db!2sSapore%20Restaurant!5e1!3m2!1sen!2set!4v1743149221724!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  aria-label="Google map showing location of Sapore Restaurant in Addis Ababa"
                  className="border-0"
                ></iframe>
                <figcaption className="sr-only">
                  Google map showing location of Sapore Restaurant in Addis Ababa, Bole,
                  Zimbabwe Street.
                </figcaption>
              </motion.figure>

              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link href="https://maps.app.goo.gl/4wmhy7Mi6CVzAwXk6" passHref>
                  <motion.a
                    className="bg-black font-medium hover:bg-transparent hover:text-black border border-black text-white py-2 px-6 text-sm transition-colors w-fit mt-6 inline-block text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Direction
                  </motion.a>
                </Link>
                <Link href="tel:+251911439712" passHref>
                  <motion.a
                    className="bg-white text-black font-medium hover:bg-black hover:text-white border border-black py-2 px-6 text-sm transition-colors w-fit mt-6 inline-block text-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Call Us
                  </motion.a>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Location Carousel Section */}
          <motion.section
            className="pb-16 md:pb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
              <motion.article
                className="xl:max-w-[50%] mx-auto"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <LocationCarousel />
              </motion.article>
            </div>
          </motion.section>
        </main>
      </div>
    </>
  );
}
