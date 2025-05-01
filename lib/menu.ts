import { db } from "@/lib/db/db";
import type { MenuItem } from "@/types";
import { unstable_cache } from 'next/cache';

// First define the uncached version
async function getMenuItemsUncached(isAdmin: boolean = false) {
  try {
    const [menuSettings] = await db.query.menuSettings.findMany({
      limit: 1,
    });

    const menuItems = await db.query.menuItem.findMany({
      with: {
        category: true,
      },
    });

    // Handle the itemType type safety
    const typedMenuItems = menuItems.map(item => ({
      ...item,
      itemType: item.itemType as 'starter' | 'maindish' | 'dessert'
    }));

    if (isAdmin) return typedMenuItems;

    return typedMenuItems.map((item: MenuItem) => ({
      ...item,
      price: menuSettings?.showPrice ? item.price : null,
      description: menuSettings?.showDescription ? item.description : null,
    }));
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    throw new Error("Failed to load menu data");
  }
}

// Then wrap it with unstable_cache
export const getMenuItems = unstable_cache(
  getMenuItemsUncached,
  ['menu-items'],
  { revalidate: 3600 } // 1 hour cache
);