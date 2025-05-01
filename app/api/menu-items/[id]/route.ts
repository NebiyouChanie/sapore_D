import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { menuItem } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const item = await db.query.menuItem.findFirst({
      where: eq(menuItem.id, id),
      with: { category: true },
    });

    if (!item) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...item,
        categoryId: item.category.id,
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
    const validatedData = menuItemSchema.parse(body);

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

    const [updatedItem] = await db
      .select()
      .from(menuItem)
      .where(eq(menuItem.id, id))
      .limit(1);

    return NextResponse.json(updatedItem, { status: 200 });
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

    await db.delete(menuItem).where(eq(menuItem.id, id));

    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
