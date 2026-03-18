'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function Custom404Illustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <motion.div 
        className="relative aspect-[4/3]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
      >
        {/* Background shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/10 rounded-3xl" />
        <motion.div 
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* "404" Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[12rem] md:text-[16rem] font-black text-white/5 select-none leading-none italic">
            404
          </span>
        </div>

        {/* Character with telescope */}
        <motion.div 
          className="absolute bottom-0 right-1/4 w-1/2"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Body */}
          <div className="w-full aspect-[2/3] bg-dark/50 rounded-t-full border-2 border-white/10 backdrop-blur-sm" />
          {/* Head */}
          <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-1/2 aspect-square bg-dark/50 rounded-full border-2 border-white/10" />
          {/* Telescope */}
          <div className="absolute top-0 left-1/4 w-full h-1/4 bg-primary/30 rounded-full border-2 border-primary/50 -rotate-12" />
        </motion.div>

        {/* Clouds */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-1/3 h-1/4 bg-white/5 rounded-full blur-md"
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-1/2 h-1/3 bg-white/5 rounded-full blur-lg"
          animate={{ x: [20, -20, 20] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
