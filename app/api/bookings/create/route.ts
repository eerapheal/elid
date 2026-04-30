import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Booking } from '@/models';
import { sendEmail, bookingConfirmationEmail, newBookingNotificationEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      eventDate,
      eventType,
      eventLocation,
      guestCount,
      budget,
      services,
      message,
    } = body;

    // Validation
    if (!clientName || !clientEmail || !clientPhone || !eventDate || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = new Booking({
      clientName,
      clientEmail,
      clientPhone,
      eventDate: new Date(eventDate),
      eventType,
      eventLocation,
      guestCount,
      budget,
      services,
      message,
      status: 'pending',
    });

    await booking.save();

    // Send confirmation email to client
    const bookingConfirmation = bookingConfirmationEmail(
      clientName,
      new Date(eventDate).toLocaleDateString(),
      booking._id.toString()
    );

    await sendEmail({
      to: clientEmail,
      subject: 'Booking Confirmation - LID EVENT',
      html: bookingConfirmation,
    });

    // Send notification to admin
    const adminNotification = newBookingNotificationEmail(clientName, clientEmail, eventType);
    const adminEmail = process.env.EMAIL_ADMIN || process.env.EMAIL_USER;

    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `New Booking Request - ${clientName}`,
        html: adminNotification,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        bookingId: booking._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[LID] Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
