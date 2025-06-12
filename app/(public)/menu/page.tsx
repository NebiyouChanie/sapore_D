// app/menu/page.tsx
import Header from "@/components/usercomponents/Header";
import * as motion from "motion/react-client";

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
import LasagnaGrid from "@/components/usercomponents/LasagnaGrid";
import PastaGrid from "@/components/usercomponents/PastaGrid";
import PizzaGrid from "@/components/usercomponents/PizzaGrid";
import TraditionalGrid from "@/components/usercomponents/TraditionalGrid";
import SaladGrid from "@/components/usercomponents/SaladGrid";
import FastFoodGrid from "@/components/usercomponents/FastFoodGrid";

interface CategoryWithItems extends Category {
  items: MenuItem[];
  imageUrl: string;
}

export const dynamic = "force-dynamic";

// --- SEO Metadata for Next.js App Router ---
export const metadata = {
  title: "Menu - Sapore | Best Italian Restaurant in Addis Ababa",
  description:
    "Explore Sapore’s menu blending Italian tradition with bold flavors. Enjoy crispy pizzas, rich pastas, specialty lasagnas, fresh salads, and Ethiopian favorites in Addis Ababa.",
  openGraph: {
    title: "Menu - Sapore | Best Italian Restaurant in Addis Ababa",
    description:
      "Explore Sapore’s menu blending Italian tradition with bold flavors. Enjoy crispy pizzas, rich pastas, specialty lasagnas, fresh salads, and Ethiopian favorites in Addis Ababa.",
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
      "Explore Sapore’s menu blending Italian tradition with bold flavors. Enjoy crispy pizzas, rich pastas, specialty lasagnas, fresh salads, and Ethiopian favorites in Addis Ababa.",
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
        <Header />

        <main className="flex-1">
          {/* Menu Hero Section */}
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
                <header className="flex flex-col xl:flex-row xl:gap-8 xl:items-center">
                  <motion.h1
                    className="font-playfair text-4xl md:text-6xl xl:text-[90px] mb-6 xl:mb-0"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                  >
                    Menu
                  </motion.h1>
                  <motion.p
                    className="text-gray-500 font-light text-[18px] lg:max-w-[600px]"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    We blend Italian tradition with bold flavors and fresh ingredients, offering crispy pizzas like Quattro Formaggi and Pepperoni, rich pastas such as Chicken Alfredo and Pesto Pasta with Fish, and specialty lasagnas like Sapore Lasagna and Beef Lasagna, alongside juicy burgers, fresh salads, and Ethiopian favorites like Chigina Tibs and Shiro. All crafted for sharing and satisfaction.
                  </motion.p>
                </header>
               </motion.article>
            </div>
          </motion.section>

          {/* Menu Categories Section */}
          <section className="pb-20">
            <div className="container px-4 md:px-10 xl:px-32 2xl:px-40 mx-auto flex flex-col gap-12 md:gap-20">
              <div>
                <motion.p
                            className="text-2xl md:text-3xl md:font-medium font-playfair mb-2"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                >
                  Lasagna
                </motion.p>
                <LasagnaGrid />
              </div>
              <div>
                <motion.p
                            className="text-2xl md:text-3xl md:font-medium font-playfair mb-2"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                >
                  Pasta
                </motion.p>
                <PastaGrid />
              </div>
              <div>
                <motion.p
                            className="text-2xl md:text-3xl md:font-medium font-playfair mb-2"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                >
                  Pizza
                </motion.p>
                <PizzaGrid />
              </div>
              <div>
                <motion.p
                            className="text-2xl md:text-3xl md:font-medium font-playfair mb-2"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                >
                  Burger
                </motion.p>
                 <FastFoodGrid />
              </div>
              <div>
                <motion.p
                            className="text-2xl md:text-3xl md:font-medium font-playfair mb-2"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                >
                  Salad
                </motion.p>
                <SaladGrid />
              </div>
              <div>
                <motion.p
                            className="text-2xl md:text-3xl md:font-medium font-playfair mb-2"
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            viewport={{ once: true, amount: 0.3 }}
                >
                  Combo
                </motion.p>
                <TraditionalGrid />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
