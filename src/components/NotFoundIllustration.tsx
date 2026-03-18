'use client';

import { motion } from 'framer-motion';

export default function NotFoundIllustration() {
  return (
    <motion.div 
      className="relative w-[300px] h-[200px] md:w-[450px] md:h-[300px]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 100 }}
    >
      {/* Base and shadows */}
      <div className="absolute inset-0 bg-dark/50 rounded-[4rem] border-2 border-white/5 shadow-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[4rem] blur-xl" />

      {/* Floating "404" text */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[15rem] font-black italic tracking-tighter text-white/5 select-none leading-none"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        404
      </motion.div>

      {/* Glitching effect overlays */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[15rem] font-black italic tracking-tighter text-primary/50 select-none leading-none mix-blend-hard-light"
        animate={{ 
          clipPath: [
            'inset(0% 50% 0% 50%)',
            'inset(50% 0% 50% 0%)',
            'inset(0% 50% 0% 50%)',
          ],
          opacity: [0, 1, 0]
        }}
        transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}
      >
        404
      </motion.div>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[15rem] font-black italic tracking-tighter text-red-500/50 select-none leading-none mix-blend-hard-light"
        animate={{ 
          clipPath: [
            'inset(50% 0% 50% 0%)',
            'inset(0% 50% 0% 50%)',
            'inset(50% 0% 50% 0%)',
          ],
          opacity: [1, 0, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1] }}
      >
        404
      </motion.div>

      {/* Central broken link icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-24 h-24 md:w-32 md:h-32 bg-dark/80 rounded-[2rem] border-2 border-primary/20 flex items-center justify-center shadow-2xl backdrop-blur-md"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute w-1 h-full bg-red-500/50 rotate-45 blur-sm" />
          <div className="absolute w-1 h-full bg-red-500/50 -rotate-45 blur-sm" />
          <span className="font-mono text-5xl md:text-7xl text-primary">?</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
