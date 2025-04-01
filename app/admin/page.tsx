'use client';

import { useState, useEffect } from 'react';
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

interface CalculationData {
  timestamp: {
    date: string;
    time: string;
    isoString: string;
    unix: number;
  };
  userInfo: {
    fullName: string;
    dob: string;
    age: number | null;
    email: string;
    gender: string;
  };
  partnerInfo: {
    fullName: string;
    dob: string;
    age: number | null;
    gender: string;
  };
  resultInfo: {
    compatibilityScore: number;
    compatibilityPercentage: string;
    compatibilityCategory: string;
  };
}

export default function AdminPage() {
  const [calculations, setCalculations] = useState<Record<string, CalculationData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const calculationsRef = ref(database, 'calculations');
    
    const unsubscribe = onValue(calculationsRef, (snapshot) => {
      const data = snapshot.val();
      setCalculations(data || {});
      setLoading(false);
    }, (error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Loading data...</h1>
          <div className="w-16 h-16 border-t-4 border-pink-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const calculationsArray = Object.entries(calculations).map(([id, data]) => ({
    id,
    ...data
  }));

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">Love Calculator Admin Dashboard</h1>
        
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Calculations: {calculationsArray.length}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compatibility</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calculationsArray.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No data available</td>
                  </tr>
                ) : (
                  calculationsArray.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.timestamp?.date || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{item.timestamp?.time || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.userInfo?.fullName || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">
                          Age: {item.userInfo?.age || 'N/A'} | Gender: {item.userInfo?.gender || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Email: {item.userInfo?.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{item.partnerInfo?.fullName || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">
                          Age: {item.partnerInfo?.age || 'N/A'} | Gender: {item.partnerInfo?.gender || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.resultInfo?.compatibilityPercentage || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{item.resultInfo?.compatibilityCategory || 'N/A'}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}