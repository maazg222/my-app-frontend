import Link from 'next/link';
import { Mail, Heart, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark/30 border-t border-white/5 mt-20 md:mt-32 py-12 md:py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-20">
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <Link href="/" className="flex items-center space-x-3 group justify-center md:justify-start">
              <div className="bg-primary/20 p-2 md:p-2.5 rounded-xl border border-primary/20 transition-transform group-hover:rotate-6 shadow-lg shadow-primary/10">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-left">
                <span className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase italic">AgencyMail</span>
                <p className="text-[8px] md:text-[10px] text-primary font-black -mt-0.5 md:-mt-1 uppercase tracking-[0.2em]">Secure Temp Mail</p>
              </div>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed text-xs md:text-sm font-medium text-center md:text-left mx-auto md:mx-0">
              AgencyMail is the most advanced temporary email service on the web. 
              Protect your privacy, avoid spam, and stay safe with our disposable email addresses.
            </p>
            <div className="flex space-x-4 md:space-x-6 justify-center md:justify-start">
              <Link href="https://www.instagram.com/not_.maaz/" target="_blank" className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 transition-all duration-300">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4 md:space-y-6 text-center md:text-left">
            <h3 className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.2em] italic">Quick Links</h3>
            <ul className="space-y-3 md:space-y-4">
              <li><Link href="/" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">Home</Link></li>
              <li><Link href="/blog" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">Blog</Link></li>
              <li><Link href="/about" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">About Us</Link></li>
              <li><Link href="/contact" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4 md:space-y-6 text-center md:text-left">
            <h3 className="text-[10px] md:text-sm font-black text-white uppercase tracking-[0.2em] italic">Legal & Security</h3>
            <ul className="space-y-3 md:space-y-4">
              <li><Link href="/terms" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">Terms of Service</Link></li>
              <li><Link href="/privacy" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="nav-link text-[10px] md:text-sm font-bold uppercase tracking-widest">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left space-y-4 md:space-y-0">
          <p>© {currentYear} AgencyMail. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <span>MADE BY AGENCY DEVELOPMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
