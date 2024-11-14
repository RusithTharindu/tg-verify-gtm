import { NextResponse } from 'next/server';
import { verifyChannelMembership } from '../../utils/telegram';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const CHANNEL_USERNAME = process.env.TELEGRAM_CHANNEL_USERNAME || 'your_channel';
    
    const isMember = await verifyChannelMembership(userId, CHANNEL_USERNAME);
    
    return NextResponse.json({ success: true, isMember });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to verify membership' },
      { status: 500 }
    );
  }
}