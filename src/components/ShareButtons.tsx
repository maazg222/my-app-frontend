'use client';

import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ShareButtons({ title }: { title: string }) {
  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!', {
        style: {
          background: '#121212',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      });
    }
  };

  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center space-x-3 sm:space-x-4">
      <button 
        onClick={handleShare}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all active:scale-95"
        title="Copy Link"
      >
        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <div className="h-6 sm:h-8 w-px bg-white/5"></div>
      <div className="flex space-x-2 sm:space-x-3">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all active:scale-95"
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
        <a 
          href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-all active:scale-95"
          title="Share on Twitter"
        >
          <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all active:scale-95"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </div>
  );
}
