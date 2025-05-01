import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/db';
import { z } from 'zod';
import { protectApiRoute } from '@/lib/api-auth';
import { sendEmail } from '@/lib/sendEmail';
import { reservation } from '@/lib/db/schema';
import { and, eq, gte, lte, desc, count } from 'drizzle-orm';

const reservationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().trim().email('Email is required'),
  phoneNumber: z.string().min(10, 'Phone Number is required'),
  numberOfGuests: z.number().min(1, 'At least 1 guest is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  message: z.string().optional(),
});

async function POSTHandler(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = reservationSchema.parse(body);

    // Generate ID upfront since we're using UUID
    const newReservationId = crypto.randomUUID();

    // Insert with explicit ID
    await db.insert(reservation).values({
      id: newReservationId,
      name: validatedData.name,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber,
      numberOfGuests: validatedData.numberOfGuests,
      date: new Date(validatedData.date),
      time: validatedData.time,
      message: validatedData.message || '',
      status: 'Pending' as const,  
    });
    
    

    // Fetch the complete record we just inserted
    const [newReservation] = await db.select()
      .from(reservation)
      .where(eq(reservation.id, newReservationId))
      .limit(1);

    if (!newReservation) {
      throw new Error('Failed to retrieve created reservation');
    }

    const emailContent = `
      A new reservation has been made:
      - Name: ${validatedData.name}
      - Email: ${validatedData.email}
      - Phone: ${validatedData.phoneNumber}
      - Guests: ${validatedData.numberOfGuests}
      - Date: ${validatedData.date}
      - Time: ${validatedData.time}
      - Message: ${validatedData.message || 'No additional message'}
    `;
    await sendEmail('cnebiyu@gmail.com', 'New Table Reservation', emailContent);

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Error creating reservation:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to create reservation',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function GETHandler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build where conditions
    const whereConditions = [];
    if (startDate) whereConditions.push(gte(reservation.date, new Date(startDate)));
    if (endDate) whereConditions.push(lte(reservation.date, new Date(endDate)));

    // Get reservations
    const reservations = await db.query.reservation.findMany({
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      orderBy: [desc(reservation.createdAt)],
    });

    // Get total count
    const totalResult = await db.select({ count: count() })
      .from(reservation)
      .where(whereConditions.length > 0 ? and(...whereConditions) : undefined);
    const totalReservations = totalResult[0].count;

    if (reservations.length === 0) {
      return new NextResponse('No Reservation Found', { status: 404 });
    }

    return NextResponse.json({
      data: reservations,
      total: totalReservations,
      page,
      pageSize,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reservations' },
      { status: 500 }
    );
  }
}

export const POST = protectApiRoute(POSTHandler);
export const GET = protectApiRoute(GETHandler);