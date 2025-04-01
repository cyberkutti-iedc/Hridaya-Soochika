'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Splash() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    // Set random heart animation values after component mounts
    const randomHearts = [...Array(20)].map(() => ({
      fontSize: `${Math.random() * 2 + 1}rem`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`
    }));
    setHearts(randomHearts);

    // Animation progress effect
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 2.5; // Complete in 4 seconds (100 / 2.5 = 40 intervals * 100ms)
      });
    }, 100);

    // Navigation timer
    const timer = setTimeout(() => {
      router.push('/calc');
    }, 4000); // 4 seconds delay

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700">
      {/* Background animated hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map((heart, i) => (
          <div 
            key={i}
            className="absolute text-white/20 animate-float"
            style={{
              fontSize: heart.fontSize,
              left: heart.left,
              top: heart.top,
              animationDuration: heart.animationDuration,
              animationDelay: heart.animationDelay
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      {/* Main content with animations */}
      <div className="z-10 text-center px-6">
        <div className="mb-6 relative">
          <div className="text-8xl animate-heartbeat">❤️</div>
          <div className="absolute -top-4 -right-4 text-6xl animate-heartbeat" style={{ animationDelay: '0.5s' }}>❤️</div>
          <div className="absolute -bottom-4 -left-4 text-6xl animate-heartbeat" style={{ animationDelay: '1s' }}>❤️</div>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4 animate-fadeIn">
          Love Calculator
        </h1>
        
        <p className="text-white text-xl mb-8 opacity-90 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          Discover your cosmic compatibility
        </p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/80 text-sm mt-2 font-mono">Loading your destiny...</p>
      </div>
    </div>
  );
}
