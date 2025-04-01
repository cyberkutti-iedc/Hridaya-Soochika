// app/api/firebase/route.ts
import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input data
    if (!body.user || !body.partner || body.result === undefined) {
      return NextResponse.json(
        { error: 'Missing required data' },
        { status: 400 }
      );
    }
    
    const { user, partner, result } = body;
    
    // Get current date and time details
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    // Create a new entry in the 'calculations' collection
    const calculationsRef = ref(database, 'calculations');
    
    // Use a try-catch specifically for the Firebase operation
    try {
      await push(calculationsRef, {
        // Timestamp information
        timestamp: {
          serverTimestamp: serverTimestamp(),
          date: formattedDate,
          time: formattedTime,
          isoString: now.toISOString(),
          unix: Math.floor(now.getTime() / 1000)
        },
        
        // User information - organized by category
        userInfo: {
          fullName: user.fullName || 'Anonymous',
          dob: user.dob || '',
          age: calculateAge(user.dob),
          email: user.email || '',
          gender: user.gender || '',
        },
        
        // Partner information - organized by category
        partnerInfo: {
          fullName: partner.fullName || 'Anonymous',
          dob: partner.dob || '',
          age: calculateAge(partner.dob),
          gender: partner.gender || '',
        },
        
        // Result information - all calculation related data
        resultInfo: {
          compatibilityScore: result,
          compatibilityPercentage: `${result}%`,
          compatibilityCategory: getCategoryFromScore(result),
        }
      });
      
      return NextResponse.json({ success: true });
    } catch (firebaseError) {
      console.error('Firebase operation error:', firebaseError);
      return NextResponse.json(
        { error: 'Database operation failed', details: (firebaseError as Error).message },
        { status: 500 }
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

// Helper function to calculate age from date of birth
function calculateAge(dob: string): number | null {
  if (!dob) return null;
  
  try {
    const birthDate = new Date(dob);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  } catch (error) {
    console.error('Error calculating age:', error);
    return null;
  }
}

// Helper function to categorize compatibility score
function getCategoryFromScore(score: number): string {
  if (score >= 90) return 'Perfect Match';
  if (score >= 80) return 'Strong Match';
  if (score >= 70) return 'Good Match';
  if (score >= 60) return 'Moderate Match';
  if (score >= 50) return 'Average Match';
  if (score >= 40) return 'Challenging Match';
  if (score >= 30) return 'Difficult Match';
  if (score >= 20) return 'Poor Match';
  return 'Very Poor Match';
}