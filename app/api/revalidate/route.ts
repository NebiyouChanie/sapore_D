import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Revalidate home and menu pages
    // @ts-expect-error: revalidate is available in Next.js API routes
    await req.revalidate("/");
    // @ts-expect-error: revalidate is available in Next.js API routes
    await req.revalidate("/menu");
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
