import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Contact } from '@/models';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create contact message
    const contact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
      read: false,
    });

    await contact.save();

    // Send confirmation email to user
    const userConfirmation = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2c1a4e;">We Received Your Message</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to Events & More. We have received your inquiry and will get back to you shortly.</p>
        <p style="color: #999; font-size: 12px; margin-top: 30px;">© 2026 Events & More. All rights reserved.</p>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: 'Thank you for contacting Events & More',
      html: userConfirmation,
    });

    // Send notification to admin
    const adminEmail = process.env.EMAIL_ADMIN || process.env.EMAIL_USER;
    if (adminEmail) {
      const adminNotification = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `;

      await sendEmail({
        to: adminEmail,
        subject: `New Contact: ${subject}`,
        html: adminNotification,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[ELID] Contact error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
