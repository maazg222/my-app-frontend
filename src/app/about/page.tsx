import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Zap } from 'lucide-react';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AgencyMail, the world\'s most trusted and fastest temporary email service designed for privacy and security.',
  keywords: ['about agencymail', 'temp mail service', 'privacy mission', 'secure disposable email'],
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-16 w-full">
        <AdPlaceholder type="leaderboard" className="mb-12" />
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">About AgencyMail</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The world's most trusted temporary email service. 
            Designed for developers, privacy enthusiasts, and everyone in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="glass-card flex flex-col items-center text-center p-8">
            <div className="bg-primary/20 p-4 rounded-2xl mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-400">
              We believe that online privacy is a fundamental right. 
              Our mission is to provide simple, free, and effective tools to help people protect their personal data 
              from trackers, spammers, and data brokers.
            </p>
          </div>

          <div className="glass-card flex flex-col items-center text-center p-8">
            <div className="bg-emerald-500/20 p-4 rounded-2xl mb-6">
              <Zap className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <p className="text-gray-400">
              Unlike other services, AgencyMail is built on a high-performance architecture 
              that ensures instant email delivery and a seamless user experience. 
              We don't log your data, and your emails are automatically deleted.
            </p>
          </div>
        </div>

        <div className="glass-card bg-gradient-to-r from-blue-600/10 to-emerald-600/10 border-blue-500/20 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">The AgencyMail Advantage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <p className="text-gray-400">Free to use forever</p>
            </div>
            <div className="text-center space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
              <div className="text-4xl font-bold text-emerald-500">Instant</div>
              <p className="text-gray-400">Delivery speed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">0</div>
              <p className="text-gray-400">Personal data logs</p>
            </div>
          </div>
        </div>

        <AdPlaceholder type="leaderboard" className="mt-20" />
      </main>
      <Footer />
    </div>
  );
}
