import { db } from "@/lib/db/db";
import { NextResponse, NextRequest } from "next/server";
import { protectApiRoute } from "@/lib/api-auth";
import { eq, inArray } from 'drizzle-orm';
import { menuItem, menuSettings,category } from '@/lib/db/schema';
import { z } from "zod";

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  isSpecial: z.boolean().default(false),
  isMainMenu: z.boolean().default(false),
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
  itemType: z.enum(['starter', 'maindish', 'dessert']),
});




async function POSTHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = menuItemSchema.parse(body);

    // Generate ID upfront since we're using UUID
    const newId = crypto.randomUUID();

    await db.insert(menuItem).values({
      id: newId, // Include the ID in the insert
      name: validatedData.name,
      description: validatedData.description,
      price: validatedData.price,
      categoryId: validatedData.categoryId,
      isSpecial: validatedData.isSpecial,
      isMainMenu: validatedData.isMainMenu,
      imageUrl: validatedData.imageUrl,
      itemType: validatedData.itemType,
    });

    // Get the newly created item using our known ID
    const [newMenuItem] = await db.select()
      .from(menuItem)
      .where(eq(menuItem.id, newId))
      .limit(1);

    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error("Error adding menu item:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: error.errors.map(e => ({
            field: e.path[0],
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add menu item" },
      { status: 500 }
    );
  }
}




async function GETHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get("admin") === "true";

    // Fetch menu settings (assume only one row)
    const [settings] = await db.select().from(menuSettings).limit(1);

    // Fetch all menu items
    const items = await db.select().from(menuItem);

    // Extract category IDs from menu items
    const categoryIds = [...new Set(items.map(item => item.categoryId).filter(Boolean))];

    // Fetch categories for those IDs
    const categories = categoryIds.length > 0
      ? await db.select().from(category).where(inArray(category.id, categoryIds))
      : [];

    // Map categories by id for quick lookup
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));

    // Attach category data manually to each menu item
    const itemsWithCategory = items.map(item => ({
      ...item,
      category: categoryMap.get(item.categoryId) || null,
    }));

    // If admin, return full data
    if (isAdmin) {
      return NextResponse.json(itemsWithCategory, { status: 200 });
    }

    // Otherwise, filter price and description based on settings
    const filteredItems = itemsWithCategory.map(item => ({
      ...item,
      price: settings?.showPrice ? item.price : null,
      description: settings?.showDescription ? item.description : null,
    }));

    return NextResponse.json(filteredItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

 


const protectedPOST = protectApiRoute(POSTHandler);

export { 
  GETHandler as GET,
  protectedPOST as POST 
};