// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input data for admin username and password
    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const { username, password } = body;

    // Fetch the stored admin credentials from Firebase Realtime Database
    const adminRef = ref(database, 'adminCredentials');
    const snapshot = await get(adminRef);

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: 'Admin credentials not found in database' },
        { status: 500 }
      );
    }

    const adminData = snapshot.val();

    // Check if the username and password match the stored credentials
    if (adminData.username === username && adminData.password === password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Request parsing error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: (error as Error).message },
      { status: 400 }
    );
  }
}
