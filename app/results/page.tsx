'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ResultCard from '@/components/ResultCard';

export default function Results() {
  const searchParams = useSearchParams();
  const compatibility = searchParams.get('compatibility') || '0';
  let details = {};

  try {
    const detailsParam = searchParams.get('details');
    details = detailsParam ? JSON.parse(decodeURIComponent(detailsParam)) : {};
  } catch (error) {
    console.error('Error parsing details:', error);
    details = {};
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gradient-to-r from-pink-200 via-red-100 to-pink-200">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Your Love Compatibility
        </h1>
        
        <ResultCard compatibility={parseFloat(compatibility) || 0} details={details} />
        
        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition"
          >
            Calculate Again
          </Link>
        </div>
      </div>
    </main>
  );
}
