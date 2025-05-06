import { db } from "@/lib/db/db";
  
const validItemTypes = ['starter', 'maindish', 'dessert'] as const;
type ValidItemType = typeof validItemTypes[number];


export async function getMenuItems(isAdmin: boolean = false) {
  try {
    // Fetch menu settings
    const [menuSettings] = await db.query.menuSettings.findMany({
      limit: 1,
    });

    // Fetch all menu items
    const menuItems = await db.query.menuItem.findMany();

    // Fetch all categories
    const categories = await db.query.category.findMany();

    // Attach category to each menu item
    const itemsWithCategory = menuItems.map(item => ({
      ...item,
      category: categories.find(cat => cat.id === item.categoryId) || null,
    }));

    const validItemTypes = ['starter', 'maindish', 'dessert'] as const;
    type ValidItemType = typeof validItemTypes[number];

    function toValidItemType(type: string): ValidItemType {
      if (validItemTypes.includes(type as ValidItemType)) {
        return type as ValidItemType;
      }
      return 'starter';
    }

    if (isAdmin) return itemsWithCategory.map(item => ({
      ...item,
      itemType: toValidItemType(item.itemType),
    }));

    return itemsWithCategory.map((item) => ({
      ...item,
      itemType: toValidItemType(item.itemType),
      price: menuSettings?.showPrice ? item.price : null,
      description: menuSettings?.showDescription ? item.description : null,
    }));
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    return [];
  }
}
