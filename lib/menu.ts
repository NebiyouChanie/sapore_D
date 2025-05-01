import { db } from "@/lib/db/db";
import type { MenuItem } from "@/types";

export async function getMenuItems(isAdmin: boolean = false) {
  try {
    // Fetch menu settings (assume only one row exists)
    const [menuSettings] = await db.query.menuSettings.findMany({
      limit: 1,
    });

    // Fetch menu items with category included
    const menuItems = await db.query.menuItem.findMany({
      with: {
        category: true,
      },
    });

    if (isAdmin) return menuItems;

    // Modify for frontend based on settings
    return menuItems.map((item: MenuItem) => ({
      ...item,
      price: menuSettings?.showPrice ? item.price : null,
      description: menuSettings?.showDescription ? item.description : null,
    }));
  } catch (error) {
    // Log the error for debugging
    console.error("Failed to fetch menu items:", error);

    // Option 1: Return an empty array (safe for frontend)
    return [];

    // Option 2: Throw an error (if you want to show an error message in the UI)
    // throw new Error("Failed to load menu data");
  }
}
