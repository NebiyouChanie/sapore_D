import { db } from "@/lib/db/db";
import type { Category } from "@/types";

export async function fetchCategories(): Promise<Category[]> {
  const categories = await db.query.category.findMany();
  return categories;
}