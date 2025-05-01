import { db } from "@/lib/db/db";
import { NextResponse, NextRequest } from "next/server";
import { protectApiRoute } from "@/lib/api-auth";
import { eq } from 'drizzle-orm';
import { category } from '@/lib/db/schema';

async function GETHandler() {
  try {
    const categories = await db.query.category.findMany();

    if (!categories || categories.length === 0) {
      return new NextResponse("No Categories Found", { status: 404 });
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function POSTHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    // Check if category exists
    const [existingCategory] = await db.select()
      .from(category)
      .where(eq(category.name, name))
      .limit(1);

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    // Generate ID upfront
    const newCategoryId = crypto.randomUUID();
    
    // Insert with explicit ID
    await db.insert(category)
      .values({ 
        id: newCategoryId,
        name 
      });

    // Fetch the newly created category
    const [newCategory] = await db.select()
      .from(category)
      .where(eq(category.id, newCategoryId))
      .limit(1);

    return NextResponse.json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const GET = GETHandler;
export const POST = protectApiRoute(POSTHandler);