import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { SiteSettings } from '@/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = new SiteSettings({});
      await settings.save();
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    let settings = await SiteSettings.findOne({});
    
    if (settings) {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, body, { new: true });
    } else {
      settings = new SiteSettings(body);
      await settings.save();
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
