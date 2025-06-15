// app/menu/page.tsx
import Image from "next/image";
import * as motion from "motion/react-client";
import QuickLinks from "@/components/QuickLinks";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  isMainMenu: boolean;
  imageUrl: string;
  isSpecial: boolean;
  itemType: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
}

import { fetchCategories as getCategories } from "@/lib/categories";
import { getMenuItems } from "@/lib/menu";

interface CategoryWithItems extends Category {
  items: MenuItem[];
  imageUrl: string;
}

export const dynamic = "force-dynamic";

// --- SEO Metadata for Next.js App Router ---
export const metadata = {
  title: "Menu - Sapore | Best Italian Restaurant in Addis Ababa",
  description:
    "Explore Sapore's menu blending Italian tradition with bold flavors. Enjoy crispy pizzas, rich pastas, specialty lasagnas, fresh salads, and Ethiopian favorites in Addis Ababa.",
  openGraph: {
    title: "Menu - Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Explore Sapore's menu blending Italian tradition with bold flavors. Enjoy crispy pizzas, rich pastas, specialty lasagnas, fresh salads, and Ethiopian favorites in Addis Ababa.",
    keywords: [
      "Sapore menu Addis Ababa",
      "Italian menu Addis Ababa",
      "pasta menu Addis Ababa",
      "pizza menu Addis Ababa",
      "lasagna Addis Ababa",
      "Italian food menu Ethiopia",
      "best pasta in Addis Ababa",
      "best pizza in Addis Ababa",
      "vegetarian Italian food Addis"
    ].join(", "),

    url: "https://saporerestaurant.com/menu",
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
    title: "Menu - Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Explore Sapore's menu blending Italian tradition with bold flavors. Enjoy crispy pizzas, rich pastas, specialty lasagnas, fresh salads, and Ethiopian favorites in Addis Ababa.",
    images: ["https://saporerestaurant.com/hero-section.jpg"],
  },
};

export default async function MenuPage() {
  const [categories, menuItems] = await Promise.all([getCategories(), getMenuItems()]);

  // Group menu items by category
  const categoriesWithItems: CategoryWithItems[] = categories
    .map((category: Category) => {
      const items = menuItems.filter((item) => item.categoryId === category.id) as MenuItem[];
      return {
        ...category,
        items,
        imageUrl: items.length > 0 ? items[0].imageUrl : "/placeholder.svg",
      };
    })
    .filter((category: CategoryWithItems) => category.items.length > 0);

  // Prepare JSON-LD structured data for menu
  const menuStructuredData = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Sapore Menu",
    url: "https://saporerestaurant.com/menu",
    hasMenuSection: categoriesWithItems.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      hasMenuItem: category.items.map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description || "",
        image: item.imageUrl,
        offers: {
          "@type": "Offer",
          price: item.price?.toFixed(2) || "0.00",
          priceCurrency: "USD", // Change currency if needed
        },
      })),
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data for Menu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuStructuredData) }}
      />

      <div className="flex flex-col min-h-screen">

        <main className="flex-1">
          {/* Menu Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
              <motion.article
                className=""
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <header className="flex flex-col xl:flex-row xl:gap-8 xl:items-center">
                  <motion.h1
                    className="font-playfair text-4xl md:text-6xl xl:text-[90px] mb-6 xl:mb-0 flex  gap-4 items-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                  >
                    <div className="rounded-full w-[60px] h-[60px] xl:w-[80px] xl:h-[80px] relative">
                      <Image
                        src="/sapore-logo.svg"
                        alt="Sapore Logo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <p>
                      Menu
                    </p>
                  </motion.h1>
                </header>
              </motion.article>
            </div>
          </motion.section>

          {/* Sticky Quick Links */}
          <div className="sticky top-0 z-10 bg-white shadow-md">
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
              {categories.length > 0 && <QuickLinks categories={categories} />}
            </div>
          </div>

          {/* Menu Categories Section */}
          <section className="pb-20 pt-8">
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto">
              {categoriesWithItems.length > 0 ? (
                categoriesWithItems.map((category: CategoryWithItems, catIndex: number) => (
                  <motion.section
                    key={category.id}
                    id={category.name.toLowerCase().replace(/\s+/g, "-")}
                    className="mb-20 scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                  >
                    <div className="grid md:grid-cols-[300px_1fr] gap-8">
                      {/* Category Image */}
                      <motion.figure
                        className="relative h-[400px] rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Image
                          src={category.imageUrl}
                          alt={`Image representing ${category.name} category`}
                          fill
                          className="object-cover"
                          priority
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                        <figcaption className="absolute inset-0 bg-black/30 flex items-center justify-center p-6 text-white font-playfair text-4xl font-medium">
                          {category.name}
                        </figcaption>
                      </motion.figure>

                      {/* Menu Items */}
                      <article className="space-y-6" aria-label={`${category.name} menu items`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {category.items.map((item: MenuItem, itemIndex: number) => (
                            <motion.article
                              key={item.id}
                              className="flex gap-4 group"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: itemIndex * 0.05, duration: 0.5 }}
                            >
                              <motion.div
                                className="relative w-20 h-20 rounded-md overflow-hidden shrink-0"
                                whileHover={{ scale: 1.1 }}
                              >
                                <Image
                                  src={item.imageUrl || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                  sizes="80px"
                                />
                              </motion.div>
                              <div className="w-full"> 
                                <div className="flex justify-between">
                                  <h3 className="font-playfair font-bold">{item.name}</h3>
                                  <span className="font-medium">
                                    {item?.price ? item.price.toFixed(2) : ""}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              </div>
                            </motion.article>
                          ))}
                        </div>
                      </article>
                    </div>
                  </motion.section>
                ))
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Menu Not Available</h2>
                  <p className="text-gray-600">
                    We are having trouble loading our menu. Please try again later.
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}