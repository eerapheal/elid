import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Service, Portfolio, TeamMember, Testimonial, SiteSettings } from '@/models';

export async function GET() {
  try {
    await dbConnect();
    const [services, portfolio, team, testimonials, settings] = await Promise.all([
      Service.find({}).sort({ createdAt: -1 }),
      Portfolio.find({}).sort({ createdAt: -1 }),
      TeamMember.find({}).sort({ createdAt: -1 }),
      Testimonial.find({}).sort({ createdAt: -1 }),
      SiteSettings.findOne({}),
    ]);

    return NextResponse.json({
      services,
      portfolio,
      team,
      testimonials,
      settings: settings || {},
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site data' }, { status: 500 });
  }
}
