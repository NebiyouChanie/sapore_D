import { db } from "@/lib/db/db";
 
const validItemTypes = ['starter', 'maindish', 'dessert'] as const;
type ValidItemType = typeof validItemTypes[number];

function toValidItemType(type: string): ValidItemType {
  if (validItemTypes.includes(type as ValidItemType)) {
    return type as ValidItemType;
  }
  return 'starter'; // fallback
}

export async function getMenuItems(isAdmin: boolean = false) {
  try {
    // Fetch menu settings (assume only one row exists)
    const [menuSettings] = await db.query.menuSettings.findMany({
      limit: 1,
    });

    // Instead of using complex joins that generate LATERAL JOIN syntax
    // Fetch menu items and categories separately
    const menuItems = await db.query.menuItem.findMany();
    const categories = await db.query.category.findMany();
    
    // Join them manually in JavaScript
    const menuItemsWithCategories = menuItems.map(item => {
      const category = categories.find(cat => cat.id === item.categoryId) || null;
      return {
        ...item,
        category,
        itemType: toValidItemType(item.itemType)
      };
    });

    if (isAdmin) return menuItemsWithCategories;

    // Modify for frontend based on settings
    return menuItemsWithCategories.map((item) => ({
      ...item,
      price: menuSettings?.showPrice ? item.price : null,
      description: menuSettings?.showDescription ? item.description : null,
    }));
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
}
