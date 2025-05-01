import { db } from "@/lib/db/db";
import { NextResponse, NextRequest } from "next/server"
import { protectApiRoute } from "@/lib/api-auth"
import { menuSettings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function GETHandler() {
  try {
    const [settings] = await db.select().from(menuSettings).limit(1);
    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    console.error("Error fetching menu settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}


async function POSTHandler(req: NextRequest) {
  try {
    const { showPrice, showDescription } = await req.json()

    const [currentSettings] = await db.select().from(menuSettings).limit(1);
    
    await db.update(menuSettings)
      .set({ 
        showPrice, 
        showDescription 
      })
      .where(eq(menuSettings.id, currentSettings.id));

    // Fetch the updated settings
    const [updatedSettings] = await db.select()
      .from(menuSettings)
      .where(eq(menuSettings.id, currentSettings.id))
      .limit(1);

    return NextResponse.json(updatedSettings, { status: 200 })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

 
export const GET = protectApiRoute(GETHandler)
export const POST = protectApiRoute(POSTHandler)