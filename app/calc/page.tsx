'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserForm from '@/components/UserForm';
import PartnerForm from '@/components/PartnerForm';
import Preview from '@/components/Preview';
import { getRandomQuote } from '@/lib/quotes';

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [quote, setQuote] = useState('');
  const [userData, setUserData] = useState({
    fullName: '',
    dob: '',
    email: '',
    gender: ''
  });
  const [partnerData, setPartnerData] = useState({
    fullName: '',
    dob: '',
    gender: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleUserSubmit = (data: typeof userData) => {
    setUserData(data);
    setStep(2);
  };

  const handlePartnerSubmit = (data: typeof partnerData) => {
    setPartnerData(data);
    setStep(3);
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
          partner: partnerData
        }),
      });

      const result = await response.json();
      
      // Save data to Firebase Realtime Database
      await fetch('/api/firebase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userData,
          partner: partnerData,
          result: result.compatibility
        }),
      });

      // Redirect to results page with data
      router.push(`/results?compatibility=${result.compatibility}&details=${encodeURIComponent(JSON.stringify(result.details))}`);
    } catch (error) {
      console.error('Error calculating compatibility:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-gradient-to-r from-pink-200 via-red-100 to-pink-200">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-4">
          Love Calculator
        </h1>
        
        <div className="mb-6 p-4 bg-pink-50 rounded-lg italic text-center">
          "{quote}"
        </div>
        
        {step === 1 && (
          <UserForm initialData={userData} onSubmit={handleUserSubmit} />
        )}
        
        {step === 2 && (
          <PartnerForm initialData={partnerData} onSubmit={handlePartnerSubmit} />
        )}
        
        {step === 3 && (
          <Preview 
            userData={userData} 
            partnerData={partnerData} 
            onBack={() => setStep(2)}
            onCalculate={handleCalculate}
            isLoading={isLoading}
          />
        )}
      </div>
    </main>
  );
}