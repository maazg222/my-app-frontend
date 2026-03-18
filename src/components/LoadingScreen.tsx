'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function LoadingScreen({ duration = 5, subtitle = "Securing Your Inbox" }: { duration?: number, subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-dark"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Mail className="w-10 h-10 text-primary" />
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          AgencyMail
        </h1>
        <p className="text-gray-400 mt-2 font-medium tracking-widest uppercase text-xs">
          {subtitle}
        </p>
      </motion.div>

      <div className="mt-12 w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: duration,
            ease: "linear"
          }}
          className="h-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </div>
    </motion.div>
  );
}
