'use client';

import { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  type?: 'leaderboard' | 'vertical' | 'small';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default function AdPlaceholder({ type = 'leaderboard', className = '' }: AdPlaceholderProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (typeof window !== 'undefined' && adRef.current) {
          const { width } = adRef.current.getBoundingClientRect();
          if (width > 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            // Retry after a short delay if width is 0
            setTimeout(pushAd, 500);
          }
        }
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    };

    // Delay slightly to allow layout to settle
    const timer = setTimeout(pushAd, 100);
    return () => clearTimeout(timer);
  }, []);

  if (type === 'leaderboard') {
    return (
      <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Advertisement</span>
        <div ref={adRef} className="h-[90px] w-full max-w-[728px] overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'inline-block', width: '728px', height: '90px' }}
               data-ad-client="ca-pub-9864680842416202"
               data-ad-slot="3892302330"></ins>
        </div>
      </div>
    );
  }

  if (type === 'vertical') {
    return (
      <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Advertisement</span>
        <div ref={adRef} className="w-full min-h-[250px] overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-9864680842416202"
               data-ad-slot="5759784321"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center my-8 ${className}`}>
      <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Advertisement</span>
      <div ref={adRef} className="w-full h-[60px] max-w-[468px] overflow-hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-9864680842416202"
             data-ad-slot="9962886662"
             data-ad-format="horizontal"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
}
