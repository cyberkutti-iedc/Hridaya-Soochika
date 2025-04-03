import { NextResponse } from 'next/server';
import { calculateLoveCompatibility } from '@/lib/calculations';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user, partner } = body;

    // Validate input
    if (!user || !user.fullName || !user.dob || !user.gender) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }
    
    if (!partner || !partner.fullName || !partner.gender) {
      return NextResponse.json({ error: 'Invalid partner data' }, { status: 400 });
    }

    // Calculate compatibility
    const result = calculateLoveCompatibility(user, partner);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calculating compatibility:', error);
    return NextResponse.json({ error: 'Failed to calculate compatibility' }, { status: 500 });
  }
}