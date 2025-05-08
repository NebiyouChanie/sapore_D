import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { paths } = await req.json();
    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json({ message: "No paths provided" }, { status: 400 });
    }
    for (const path of paths) {
      revalidatePath(path);
    }
    return NextResponse.json({ revalidated: true, paths });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: err }, { status: 500 });
  }
}
