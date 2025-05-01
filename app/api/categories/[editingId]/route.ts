import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db/db";
import { eq } from 'drizzle-orm';
import { category, menuItem } from '@/lib/db/schema';

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ editingId: string }> }
) => {
  try {
    const { editingId } = await params;
    const body = await request.json();

    await db
      .update(category)
      .set(body)
      .where(eq(category.id, editingId));

    const [updatedCategory] = await db
      .select()
      .from(category)
      .where(eq(category.id, editingId))
      .limit(1);

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("[CATEGORY_PUT]", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ editingId: string }> }
) => {
  try {
    const { editingId } = await params;

    if (!editingId) {
      return NextResponse.json({ error: "Invalid category ID" }, { status: 400 });
    }

    // Check if category exists
    const [existingCategory] = await db
      .select()
      .from(category)
      .where(eq(category.id, editingId))
      .limit(1);

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    // Check for referenced menu items
    const referencedItems = await db
      .select()
      .from(menuItem)
      .where(eq(menuItem.categoryId, editingId));

    if (referencedItems.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot delete category",
          message: `This category is used by ${referencedItems.length} menu item(s)`
        },
        { status: 400 }
      );
    }

    // Delete the category
    await db.delete(category).where(eq(category.id, editingId));

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("[CATEGORY_DELETE]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};