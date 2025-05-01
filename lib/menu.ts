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
    const [menuSettings] = await db.query.menuSettings.findMany({
      limit: 1,
    });

    const menuItems = await db.query.menuItem.findMany({
      with: {
        category: true,
      },
    });

    if (isAdmin) return menuItems.map(item => ({
      ...item,
      itemType: toValidItemType(item.itemType),
    }));

    return menuItems.map((item) => ({
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
