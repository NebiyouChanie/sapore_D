import { db } from "@/lib/db/db";
import { NextResponse, NextRequest } from "next/server";
import { protectApiRoute } from "@/lib/api-auth";
import { eq } from 'drizzle-orm';
import { menuItem, menuSettings } from '@/lib/db/schema';
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

    const [settings] = await db.select().from(menuSettings).limit(1);

    const items = await db.query.menuItem.findMany({
      with: {
        category: true,
      },
    });

    if (isAdmin) {
      return NextResponse.json(items, { status: 200 });
    }

    const filteredItems = items.map((item) => ({
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