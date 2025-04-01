// app/api/check-env/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Check if required Firebase environment variables are set
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
  ];
  
  const missingVars = requiredEnvVars.filter(
    varName => !process.env[varName]
  );
  
  if (missingVars.length > 0) {
    return NextResponse.json(
      { 
        error: 'Missing environment variables', 
        missing: missingVars 
      },
      { status: 500 }
    );
  }
  
  return NextResponse.json({ 
    status: 'ok',
    message: 'All required environment variables are set'
  });
}