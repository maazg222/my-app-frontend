'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Custom404Illustration from '@/components/Custom404Illustration';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          
          {/* Left Side: Text Content */}
          <motion.div 
            className="text-center md:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-primary uppercase tracking-tighter italic">
              404 Error
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              The page you are looking for was moved, removed, renamed or might never have existed.
            </p>
            <Link 
              href="/" 
              className="inline-block btn-primary !py-4 !px-10 !text-base !rounded-xl shadow-lg shadow-primary/30"
            >
              Go to Homepage
            </Link>
          </motion.div>

          {/* Right Side: Illustration */}
          <Custom404Illustration />

        </div>
      </main>
      <Footer />
    </div>
  );
}
