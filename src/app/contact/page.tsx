import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageCircle, Instagram, Disc as Discord, ExternalLink, ShieldCheck, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Need help or have questions? Contact the AgencyMail team through our Discord community, Instagram, or live support.',
  keywords: ['contact agencymail', 'temp mail support', 'customer service', 'privacy help'],
};

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-dark">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      </div>

      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        <AdPlaceholder type="leaderboard" className="mb-12" />
        <div className="text-center mb-20 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-black uppercase tracking-[0.4em] max-w-2xl mx-auto italic">
            Connect with our global support nodes 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Discord Card */}
          <div className="glass-card group hover:border-indigo-500/50 transition-all duration-500 bg-gradient-to-br from-indigo-600/[0.05] to-transparent !p-10 flex flex-col justify-between min-h-[400px]">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-[2rem] flex items-center justify-center border border-indigo-500/20 group-hover:rotate-6 transition-transform duration-500">
                <Discord className="w-10 h-10 text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Discord Server</h3>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                  Join our community for instant updates and support.
                </p>
              </div>
            </div>
            <Link 
              href="https://discord.gg/fia" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] italic shadow-xl shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Join Community</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Instagram Card */}
          <div className="glass-card group hover:border-pink-500/50 transition-all duration-500 bg-gradient-to-br from-pink-600/[0.05] to-transparent !p-10 flex flex-col justify-between min-h-[400px]">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-pink-500/20 rounded-[2rem] flex items-center justify-center border border-pink-500/20 group-hover:-rotate-6 transition-transform duration-500">
                <Instagram className="w-10 h-10 text-pink-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Instagram</h3>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                  Follow us for the latest news and features.
                </p>
              </div>
            </div>
            <Link 
              href="https://www.instagram.com/not_.maaz/" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] italic shadow-xl shadow-pink-600/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Follow @not_.maaz</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Live Support Card */}
          <div className="glass-card group hover:border-primary/50 transition-all duration-500 bg-gradient-to-br from-primary/[0.05] to-transparent !p-10 flex flex-col justify-between min-h-[400px]">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center border border-primary/20 group-hover:rotate-12 transition-transform duration-500">
                <MessageCircle className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Live Support</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-emerald-400 font-black text-xs uppercase tracking-widest">Online 24/7</p>
                </div>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest leading-relaxed">
                  Our team is available round the clock on Discord.
                </p>
              </div>
            </div>
            <Link 
              href="https://discord.gg/b8mdRcFCgr" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 bg-primary hover:bg-blue-500 text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] italic shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
            >
              <span>Open Ticket</span>
              <Discord className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Contact Section */}
        <div className="mt-20 glass-card !p-12 flex flex-col md:flex-row items-center justify-between gap-8 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Direct Inquiry?</h3>
            <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">Drop us a line at our official mail node</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Email Node</p>
              <p className="text-xl font-black text-white italic tracking-tighter">support@{process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname : 'agencymail.qzz.io'}</p>
            </div>
            <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all duration-300">
              <Mail className="w-8 h-8" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
