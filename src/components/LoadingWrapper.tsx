'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingScreen from './LoadingScreen';
import { AnimatePresence } from 'framer-motion';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // Initial load effect (5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setIsInitialLoad(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Path change effect (2 seconds)
  useEffect(() => {
    if (!isInitialLoad) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen 
            key={isInitialLoad ? 'initial-loader' : `page-loader-${pathname}`} 
            duration={isInitialLoad ? 5 : 2} 
            subtitle={isInitialLoad ? "Securing Your Inbox" : "Switching Apis..."}
          />
        )}
      </AnimatePresence>
      <div className={loading ? 'hidden' : 'block animate-fade-in'}>
        {children}
      </div>
    </>
  );
}
