import * as motion from "motion/react-client";
import Head from "next/head";
import GridGallery from "@/components/usercomponents/FoodGrid";
import Header from "@/components/usercomponents/Header";

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery - Sapore | Authentic Italian Restaurant in Addis Ababa</title>
        <meta
          name="description"
          content="Explore the gallery of Sapore, showcasing our delicious Italian dishes including pasta, lasagna, and wood-fired pizza served in Addis Ababa."
        />
        {/* Structured Data for Gallery Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Gallery - Sapore",
              "description":
                "A collection of images showcasing the authentic Italian dishes and cozy ambiance of Sapore restaurant in Addis Ababa.",
              "mainEntity": [
                //  {
                //   "@type": "ImageObject",
                //   "contentUrl": "https://saporerestaurant.com/images/lasagna.jpg",
                //   "description": "Delicious homemade lasagna at Sapore restaurant"
                // },
                // {
                //   "@type": "ImageObject",
                //   "contentUrl": "https://saporerestaurant.com/images/pasta.jpg",
                //   "description": "Fresh handmade pasta served at Sapore"
                // },
                // {
                //   "@type": "ImageObject",
                //   "contentUrl": "https://saporerestaurant.com/images/restaurant-interior.jpg",
                //   "description": "Cozy interior of Sapore restaurant"
                // }
              ]
            }),
          }}
        />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1">
          {/* Gallery Hero Section */}
          <motion.section
            className="pt-36 md:pt-36 xl:pt-48"
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
                <header>
                  <motion.h1
                    className="font-playfair text-4xl md:text-6xl xl:text-[90px] mb-6 xl:mb-0"
                  >
                    Gallery
                  </motion.h1>
                </header>
              </motion.article>

              <article
                className="relative w-full overflow-hidden"
                aria-label="Gallery of Italian dishes and restaurant ambiance at Sapore"
              >
                {/* Assuming GridGallery handles alt attributes for images */}
                <GridGallery />
                <GridGallery />
                <GridGallery />
                <GridGallery />
              </article>
            </div>
          </motion.section>
        </main>
      </div>
    </>
  );
}
