import { db } from "@/lib/db/db";
import { sendEmail } from "@/lib/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm';
import { reservation } from '@/lib/db/schema';


export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const [res] = await db.select().from(reservation).where(eq(reservation.id, id)).limit(1);

    if (!res) {
      return NextResponse.json({ error: "Reservation not found." }, { status: 404 });
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("[RESERVATION_GET]", error);
    return NextResponse.json({ error: "Failed to fetch reservation" }, { status: 500 });
  }
};


export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const body = await request.json();

    await db.update(reservation)
      .set(body)
      .where(eq(reservation.id, id));

    const [updatedReservation] = await db.select()
      .from(reservation)
      .where(eq(reservation.id, id))
      .limit(1);

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("[RESERVATION_PUT]", error);
    return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
  }
};


export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    await db.delete(reservation).where(eq(reservation.id, id));
    return NextResponse.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("[RESERVATION_DELETE]", error);
    return NextResponse.json({ error: "Failed to delete reservation" }, { status: 500 });
  }
};



 
export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!["Confirmed", "Cancelled", "Pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    await db.update(reservation)
      .set({ status })
      .where(eq(reservation.id, id));

    const [updatedReservation] = await db.select()
      .from(reservation)
      .where(eq(reservation.id, id))
      .limit(1);

    if (!updatedReservation?.email) {
      console.error("Email not found for the reservation");
      return NextResponse.json({ error: "Reservation email missing" }, { status: 400 });
    }

    const emailSubject = status === "Confirmed"
      ? "Your Reservation is Confirmed"
      : "Your Reservation is Canceled";
    const emailContent = status === "Confirmed"
      ? `Hello ${updatedReservation.name},\n\nYour reservation for ${updatedReservation.date} at ${updatedReservation.time} has been confirmed. We look forward to serving you!`
      : `Hello ${updatedReservation.name},\n\nUnfortunately, your reservation for ${updatedReservation.date} at ${updatedReservation.time} has been canceled. Please contact us for more details.`;

    await sendEmail(updatedReservation.email, emailSubject, emailContent);

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("[RESERVATION_PATCH]", error);
    return NextResponse.json({ error: "Failed to update reservation status" }, { status: 500 });
  }
};

