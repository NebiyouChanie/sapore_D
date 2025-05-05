import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { menuItem, category } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { z } from "zod";

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryId: z.string().min(1, "Category is required"),
  isSpecial: z.boolean().default(false),
  isMainMenu: z.boolean().default(false),
  imageUrl: z.string().url("Invalid image URL").min(1, "Image URL is required"),
  itemType: z.enum(["starter", "maindish", "dessert"]),
});

// Helper function to fetch category by id
async function getCategoryById(categoryId: string) {
  const [cat] = await db.select().from(category).where(eq(category.id, categoryId)).limit(1);
  return cat || null;
}

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    // Fetch menu item by id
    const [item] = await db.select().from(menuItem).where(eq(menuItem.id, id)).limit(1);

    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // Fetch related category separately to avoid lateral join issues
    const categoryData = item.categoryId ? await getCategoryById(item.categoryId) : null;

    // Return combined data
    return NextResponse.json(
      {
        ...item,
        category: categoryData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validate input
    const validatedData = menuItemSchema.parse(body);

    // Update menu item
    await db
      .update(menuItem)
      .set({
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        categoryId: validatedData.categoryId,
        isSpecial: validatedData.isSpecial,
        isMainMenu: validatedData.isMainMenu,
        imageUrl: validatedData.imageUrl,
        itemType: validatedData.itemType,
      })
      .where(eq(menuItem.id, id));

    // Fetch updated item
    const [updatedItem] = await db.select().from(menuItem).where(eq(menuItem.id, id)).limit(1);

    if (!updatedItem) {
      return NextResponse.json({ error: "Menu item not found after update" }, { status: 404 });
    }

    // Fetch related category
    const categoryData = updatedItem.categoryId ? await getCategoryById(updatedItem.categoryId) : null;

    // Return updated item with category
    return NextResponse.json(
      {
        ...updatedItem,
        category: categoryData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating menu item:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    // Delete menu item by id
    await db.delete(menuItem).where(eq(menuItem.id, id));

    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
