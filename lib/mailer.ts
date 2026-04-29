import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[v0] Email sent successfully:', info.response);
    return { success: true, info };
  } catch (error) {
    console.error('[v0] Error sending email:', error);
    return { success: false, error };
  }
}

// Email templates
export function bookingConfirmationEmail(clientName: string, eventDate: string, bookingId: string) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2c1a4e 0%, #1a0f2e 100%); color: white; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 28px;">Events & More</h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Professional Event Planning</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #2c1a4e; margin-top: 0;">Booking Confirmation</h2>
        <p style="color: #666; line-height: 1.6;">Dear ${clientName},</p>
        
        <p style="color: #666; line-height: 1.6;">Thank you for choosing Events & More for your special event! We have received your booking request and are excited to work with you.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #d4a574; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; color: #2c1a4e;"><strong>Booking Details</strong></p>
          <p style="margin: 8px 0; color: #666;"><strong>Event Date:</strong> ${eventDate}</p>
          <p style="margin: 8px 0; color: #666;"><strong>Booking ID:</strong> ${bookingId}</p>
        </div>
        
        <p style="color: #666; line-height: 1.6;">Our team will contact you shortly to discuss the details and confirm all arrangements.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center;">
          <p style="margin: 0;">© 2026 Events & More. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
}

export function newBookingNotificationEmail(clientName: string, clientEmail: string, eventType: string) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c1a4e;">New Booking Request</h2>
      <p><strong>Client Name:</strong> ${clientName}</p>
      <p><strong>Email:</strong> ${clientEmail}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p>Please log in to the admin dashboard to view full details and respond to this booking.</p>
    </div>
  `;
}
