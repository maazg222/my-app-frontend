'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  Copy, 
  RefreshCw, 
  Trash2, 
  ShieldCheck, 
  Zap, 
  Mail as MailIcon, 
  ChevronRight, 
  ExternalLink,
  Loader2,
  CheckCircle2,
  Lock,
  Globe,
  Bell
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import parse, { HTMLReactParserOptions, Element, domToReact, attributesToProps } from 'html-react-parser';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/lib/blogData';
import { 
  getDomains, 
  createAccount, 
  getToken, 
  createDropMailSession,
  getMessages, 
  getMessageDetail, 
  Message,
  subscribeNewsletter,
  getBlogs,
  getFaviconUrl
} from '@/lib/api';
import { getParserOptions } from '@/lib/parser';

export default function Home() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [provider, setProvider] = useState<string>('mail.tm');
  const [availableDomains, setAvailableDomains] = useState<{domain: string, provider: string}[]>([]);
  const [customName, setCustomName] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);

  // Filtered domains based on custom mode support
  const filteredDomains = isCustomMode 
    ? availableDomains.filter(d => (d as any).supportsCustom)
    : availableDomains;

  // Initialize state from localStorage immediately to prevent reset
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setLatestBlogs(blogs.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch latest blogs:', error);
      }
    };
    fetchLatestBlogs();

    const saved = localStorage.getItem('agency_mail_data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.email) {
          setEmail(data.email);
          setPassword(data.password || '');
          setToken(data.token || '');
          setProvider(data.provider || 'mail.tm');
          if (data.messages && Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
          setLoading(false);
          // Don't generate email if we loaded one
          return;
        }
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
    // Only generate if no valid saved data found
    generateEmail();
  }, []); // Only once on mount

  const fetchDomains = useCallback(async () => {
    try {
      const domains = await getDomains();
      const formattedDomains = domains.map((d: any) => {
        const domainData = typeof d === 'string' ? { domain: d, provider: 'dropmail' } : d;
        return {
          ...domainData,
          supportsCustom: domainData.provider !== 'dropmail'
        };
      });
      setAvailableDomains(formattedDomains);
      if (formattedDomains.length > 0) {
        setSelectedDomain(formattedDomains[0].domain);
      }
    } catch (error) {
      console.error('Failed to fetch domains:', error);
    }
  }, []);

  const handleModeSwitch = (custom: boolean) => {
    setIsCustomMode(custom);
    if (custom) {
      // If current domain doesn't support custom, pick the first one that does
      const currentDomainObj = availableDomains.find(d => d.domain === selectedDomain);
      if (currentDomainObj && !(currentDomainObj as any).supportsCustom) {
        const firstSupporting = availableDomains.find(d => (d as any).supportsCustom);
        if (firstSupporting) {
          setSelectedDomain(firstSupporting.domain);
          toast('Switched to a custom-compatible domain', { icon: 'ℹ️' });
        }
      }
    }
  };

  const generateEmail = useCallback(async (customUser?: string, customDomain?: string) => {
    setLoading(true);
    try {
      const domainsData = availableDomains.length > 0 ? availableDomains : await getDomains();
      if (availableDomains.length === 0) setAvailableDomains(domainsData);

      const domainObj = customDomain 
        ? domainsData.find((d: {domain: string, provider: string}) => d.domain === customDomain) || domainsData[0]
        : domainsData[Math.floor(Math.random() * domainsData.length)];
      
      const domain = domainObj.domain;
      const currentProvider = domainObj.provider;
      
      const prefix = customUser || Math.random().toString(36).substring(2, 12);
      let fullEmail = `${prefix}@${domain}`;
      const pass = password || Math.random().toString(36).substring(2, 15);

      let authToken = '';
      let finalPass = pass;

      if (currentProvider === 'mail.tm' || currentProvider === 'mail.gw') {
        try {
          await createAccount(fullEmail, finalPass, currentProvider);
          authToken = await getToken(fullEmail, finalPass, currentProvider);
        } catch (e: any) {
          // If account exists, try to login with the same password
          // or if we have a saved password for this email in localStorage
          const saved = localStorage.getItem('agency_mail_data');
          if (saved) {
            const data = JSON.parse(saved);
            if (data.email === fullEmail && data.password) {
              finalPass = data.password;
            }
          }
          
          try {
            authToken = await getToken(fullEmail, finalPass, currentProvider);
          } catch (loginError) {
            throw new Error('This email address is already taken by another user.');
          }
        }
        setToken(authToken);
        setPassword(finalPass);
      } else if (currentProvider === 'dropmail') {
        // DropMail needs a session ID and assigns its own email unless custom is supported
        const session = await createDropMailSession(customUser ? fullEmail : undefined);
        fullEmail = session.email;
        authToken = session.id; // Use session ID as token for DropMail
        setToken(authToken);
      }

      if (fullEmail !== email) {
        setEmail(fullEmail);
        setPassword(finalPass);
        setProvider(currentProvider);
        
        const newMailData = {
          email: fullEmail,
          password: finalPass,
          token: authToken,
          provider: currentProvider,
          messages: []
        };
        
        localStorage.setItem('agency_mail_data', JSON.stringify(newMailData));
        
        setMessages([]);
        setSelectedMessage(null);
      }

      toast.success(customUser ? 'Custom email created!' : 'New temporary email generated!');
      setIsCustomMode(false);
    } catch (error: any) {
      console.error('Email generation error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'This address might be taken.';
      toast.error(`Failed to generate email: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [availableDomains, password, token, email]);

  const handleCustomCreate = useCallback(() => {
    if (!customName) {
      toast.error('Please enter a custom name');
      return;
    }
    generateEmail(customName, selectedDomain);
    setCustomName('');
  }, [customName, generateEmail, selectedDomain]);

  const fetchMessages = useCallback(async (isAuto = false) => {
    if (!email) return;
    
    // Don't show loading state if we already have messages (to avoid flash)
    if (!isAuto && messages.length === 0) setRefreshing(true);
    
    try {
      const login = email.split('@')[0];
      const domain = email.split('@')[1];
      
      const data = await getMessages({
        provider,
        token,
        login,
        domain
      });
      
      // Update state and localStorage
      if (Array.isArray(data)) {
        // Only update if data is different or we had nothing
        // Or if it's been more than 5 seconds since mount (to avoid initial empty wipe)
        setMessages(data);
        
        const saved = localStorage.getItem('agency_mail_data');
        if (saved) {
          try {
            const mailData = JSON.parse(saved);
            if (mailData.email === email) {
              localStorage.setItem('agency_mail_data', JSON.stringify({
                ...mailData,
                messages: data
              }));
            }
          } catch (e) {
            console.error('Error updating storage:', e);
          }
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      if (!isAuto) setRefreshing(false);
    }
  }, [email, provider, token, messages.length]);

  const handleReadMessage = async (id: string) => {
    try {
      const login = email.split('@')[0];
      const domain = email.split('@')[1];
      
      const detail = await getMessageDetail(id, {
        provider,
        token,
        login,
        domain
      });
      
      setSelectedMessage(detail);
    } catch (error) {
      toast.error('Failed to load message content.');
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setSubscribing(true);
    try {
      await subscribeNewsletter(newsletterEmail);
      toast.success('Successfully subscribed to newsletter!');
      setNewsletterEmail('');
    } catch (error: any) {
      console.error('Subscription error:', error);
      const message = error.response?.data?.error || 'Failed to subscribe. Please try again later.';
      toast.error(message);
    } finally {
      setSubscribing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const parserOptions = getParserOptions();

  // Initial fetch for domains only
  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  // Auto-refresh interval
  useEffect(() => {
    if (email) {
      fetchMessages(true); 
      const interval = setInterval(() => fetchMessages(true), 15000);
      return () => clearInterval(interval);
    }
  }, [email, fetchMessages]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Simplified Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      </div>

      <Navbar />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AgencyMail",
            "url": "https://agencymail.com",
            "description": "Free temporary email service. Fast, secure and easy to use.",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Instant temporary email generation",
              "No registration required",
              "Auto-refreshing inbox",
              "Privacy protection"
            ]
          })
        }}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full relative z-10">
        {/* Ad Header */}
        <div className="mb-8 md:mb-12">
          <AdPlaceholder type="leaderboard" className="mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            {/* Hero Section / Email Box */}
            <section className="glass-card bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-visible relative p-6 md:p-10">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse hidden md:block" />
              
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
                  <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent italic uppercase">
                      Instant Privacy
                    </h1>
                    <p className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Disposable • Secure • Anonymous</p>
                  </div>
                  <div className="flex bg-dark/40 p-1 rounded-2xl border border-white/5 self-center md:self-auto">
                    <button 
                      onClick={() => handleModeSwitch(false)}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 flex items-center space-x-2 ${!isCustomMode ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-gray-500 hover:text-white'}`}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 sm:w-4 h-4 ${loading && !isCustomMode ? 'animate-spin' : ''}`} />
                      <span>Random</span>
                    </button>
                    <button 
                      onClick={() => handleModeSwitch(true)}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 flex items-center space-x-2 ${isCustomMode ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'text-gray-500 hover:text-white'}`}
                    >
                      <Zap className="w-3.5 h-3.5 sm:w-4 h-4" />
                      <span>Custom</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isCustomMode ? (
                    <motion.div 
                      key="custom"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-2 md:space-y-3">
                          <label className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2 italic">Username</label>
                          <div className="relative group">
                            <input 
                              type="text" 
                              value={customName}
                              onChange={(e) => setCustomName(e.target.value)}
                              placeholder="Choose your name..."
                              className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 md:px-6 py-4 md:py-5 text-lg md:text-xl focus:outline-none focus:border-primary/50 transition-all font-mono placeholder:text-gray-700 italic"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                          </div>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                          <label className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2 italic">Domain</label>
                          <div className="relative group">
                            <select 
                              value={selectedDomain}
                              onChange={(e) => setSelectedDomain(e.target.value)}
                              className="w-full bg-dark/50 border border-white/10 rounded-2xl px-5 md:px-6 py-4 md:py-5 text-lg md:text-xl focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer pr-14 md:pr-16 font-mono italic"
                            >
                              {filteredDomains.map((d: {domain: string, provider: string}) => (
                                <option key={d.domain} value={d.domain} className="bg-dark text-white">@{d.domain}</option>
                              ))}
                            </select>
                            <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-500 rotate-90 transition-transform group-focus-within:text-primary group-focus-within:rotate-0" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={handleCustomCreate}
                        disabled={loading}
                        className="w-full btn-primary !py-5 md:!py-6 !rounded-2xl text-lg md:text-xl italic tracking-tighter shadow-2xl shadow-primary/20 active:scale-[0.98] transition-transform"
                      >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6 fill-current" />}
                        <span>Initialize Custom Inbox</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="random"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative flex flex-col md:flex-row items-stretch bg-dark/90 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                          <div className="flex-grow px-5 sm:px-6 md:px-10 flex items-center space-x-3 md:space-x-6 overflow-x-auto scrollbar-hide min-w-0 flex-nowrap h-[60px] md:h-[100px]">
                            <div className="bg-primary/10 p-2 md:p-4 rounded-xl md:rounded-2xl shrink-0 border border-primary/10 shadow-inner">
                              <MailIcon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                            </div>
                            <span className="text-lg sm:text-xl md:text-3xl font-mono text-white font-black tracking-tighter italic whitespace-nowrap leading-none">
                              {loading ? 'GENERATING...' : email || '---'}
                            </span>
                          </div>
                          
                          <div className="flex border-t md:border-t-0 md:border-l border-white/5 shrink-0 h-[60px] md:h-auto">
                            <button 
                              onClick={() => generateEmail()}
                              className="flex-1 md:flex-none px-6 md:px-8 bg-white/[0.02] hover:bg-white/[0.05] text-gray-500 hover:text-white transition-all flex items-center justify-center border-r border-white/5"
                              title="Regenerate"
                            >
                              <RefreshCw className={`w-5 h-5 md:w-6 md:h-6 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                            <button 
                              onClick={() => copyToClipboard(email)}
                              className="flex-[2] md:flex-none bg-primary hover:bg-blue-600 px-8 md:px-12 flex items-center justify-center space-x-2 md:space-x-4 transition-all active:scale-95 text-white font-black uppercase tracking-[0.2em] italic text-xs md:text-sm group/copy"
                            >
                              <Copy className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                              <span>Copy</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 md:mt-12 flex flex-wrap gap-4 md:gap-8 justify-center md:justify-start">
                    { [
                      { icon: ShieldCheck, text: 'Privacy Guard', color: 'text-emerald-500' },
                      { icon: Zap, text: 'Instant Sync', color: 'text-yellow-500' },
                      { icon: Bell, text: 'Live Alerts', color: 'text-blue-500' }
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center space-x-2.5 md:space-x-3 bg-white/[0.03] px-4 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors group">
                        <badge.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${badge.color} group-hover:scale-110 transition-transform`} />
                        <span className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest">{badge.text}</span>
                      </div>
                    ))}
                </div>
              </div>
            </section>

            {/* Inbox Section */}
            <section className="glass-card !p-0 overflow-hidden relative border-white/5 shadow-2xl rounded-[1.5rem] md:rounded-[2rem]">
              <div className="p-6 md:p-10 border-b border-white/5 bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-6">
                  <div className="bg-primary/10 p-3 md:p-4 rounded-xl md:rounded-2xl border border-primary/10">
                    <MailIcon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase italic leading-none">Inbox</h2>
                    <div className="flex items-center space-x-2 mt-1.5 md:mt-2">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <p className="text-[8px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Live Monitoring</p>
                    </div>
                  </div>
                  <div className="bg-primary text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black shadow-lg shadow-primary/20 uppercase tracking-widest">
                    {messages.length} Messages
                  </div>
                </div>
                <button 
                  onClick={() => fetchMessages()}
                  disabled={refreshing}
                  className="w-10 h-10 md:w-14 md:h-14 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center group border border-white/10 shadow-lg"
                  title="Force Refresh"
                >
                  <RefreshCw className={`w-4 h-4 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-all ${refreshing ? 'animate-spin scale-110' : ''}`} />
                </button>
              </div>

              <div className="p-4 md:p-8 space-y-4 min-h-[300px] md:min-h-[400px]">
                <AnimatePresence mode="popLayout">
                  {loading && messages.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-32 space-y-8"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                        <div className="relative p-10 bg-dark/50 rounded-full border border-white/10 shadow-2xl">
                          <Loader2 className="w-14 h-14 animate-spin text-primary" />
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <p className="text-2xl font-black text-white uppercase tracking-tighter italic">Syncing Database...</p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Awaiting cloud connection</p>
                      </div>
                    </motion.div>
                  ) : messages.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-32 space-y-8"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
                        <div className="relative p-10 bg-white/[0.02] rounded-full border border-white/5">
                          <MailIcon className="w-14 h-14 text-gray-700" />
                        </div>
                      </div>
                      <div className="text-center space-y-3">
                        <p className="text-2xl font-black text-white uppercase tracking-tighter italic">Empty Inbox</p>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest max-w-[250px] mx-auto leading-relaxed">
                          Your temporary channel is established and listening for incoming packets.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    messages.map((msg: Message, idx: number) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleReadMessage(msg.id)}
                        className={`p-6 rounded-[1.5rem] border border-white/5 cursor-pointer transition-all duration-500 flex items-center justify-between group relative overflow-hidden ${selectedMessage?.id === msg.id ? 'bg-primary/10 border-primary/30 shadow-2xl shadow-primary/10 scale-[1.02]' : 'bg-white/[0.02] hover:bg-white/[0.05] hover:scale-[1.01]'}`}
                      >
                        {selectedMessage?.id === msg.id && (
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                        )}
                        <div className="flex items-center space-x-3 md:space-x-6 overflow-hidden relative z-10">
                          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6 ${selectedMessage?.id === msg.id ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'bg-dark/50 text-gray-500 border border-white/10 group-hover:border-primary/30 group-hover:text-primary'}`}>
                            <MailIcon className="w-6 h-6 md:w-8 md:h-8" />
                          </div>
                          <div className="overflow-hidden space-y-1 md:space-y-1.5 flex-grow">
                            <h3 className="font-black text-white truncate text-lg md:text-xl tracking-tight uppercase italic group-hover:text-primary transition-colors">
                              {typeof msg.from === 'object' ? msg.from.name || msg.from.address : msg.from}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-400 font-bold uppercase tracking-wide line-clamp-1">{msg.subject}</p>
                            <p className="text-[10px] md:text-xs text-gray-600 font-medium italic line-clamp-1">{msg.intro}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0 space-y-3 md:space-y-4 relative z-10 ml-4">
                          <span className="text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] bg-white/5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl border border-white/5">
                            {format(new Date(msg.createdAt || msg.date || Date.now()), 'HH:mm')}
                          </span>
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl transition-all flex items-center justify-center ${selectedMessage?.id === msg.id ? 'bg-primary text-white rotate-90 shadow-lg' : 'bg-white/5 text-gray-700 group-hover:text-white group-hover:bg-primary/20'}`}>
                            <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1`} />
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* In-feed Ad removed */}
            </section>

            {/* Email Viewer (Modal/Panel) */}
            <AnimatePresence>
              {selectedMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card !p-0 border-primary/20 bg-primary/[0.02] relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)] rounded-[1.5rem] md:rounded-[2.5rem]"
                >
                  <div className="p-6 md:p-12">
                    <div className="absolute top-6 right-6 md:top-10 md:right-10 flex space-x-4">
                      <button 
                        onClick={() => setSelectedMessage(null)}
                        className="w-10 h-10 md:w-14 md:h-14 bg-white/5 hover:bg-red-500/20 rounded-xl md:rounded-2xl transition-all flex items-center justify-center group border border-white/10"
                      >
                        <Trash2 className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>

                    <div className="mb-8 md:mb-12 pr-12 md:pr-20 space-y-4 md:space-y-6">
                      <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-primary/20 italic">
                        <Lock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>Encrypted Message Content</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-tight">{selectedMessage.subject}</h2>
                      <div className="flex flex-wrap items-center gap-3 md:gap-6">
                        <div className="flex items-center space-x-2 md:space-x-3 bg-dark/40 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/5">
                          <MailIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                          <span className="text-primary font-black text-[10px] md:text-sm uppercase italic tracking-tighter truncate max-w-[150px] md:max-w-[200px]">
                            {typeof selectedMessage.from === 'object' ? selectedMessage.from.address : selectedMessage.from}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-3 bg-dark/40 px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/5">
                          <span className="text-[8px] md:text-[10px] font-black text-gray-600 uppercase tracking-widest">Timestamp:</span>
                          <span className="text-gray-300 font-bold text-[10px] md:text-sm italic">
                            {format(new Date(selectedMessage.createdAt || selectedMessage.date || Date.now()), 'MMM dd, HH:mm')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-dark/80 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 min-h-[300px] md:min-h-[500px] overflow-auto border border-white/5 shadow-inner-xl email-viewer-content">
                      {selectedMessage.html ? (
                        <div className="email-content prose prose-invert max-w-none prose-primary prose-sm md:prose-lg">
                          {parse(DOMPurify.sanitize(selectedMessage.html[0] || selectedMessage.text || ''), parserOptions)}
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap font-mono text-gray-300 text-xs md:text-sm leading-relaxed italic">
                          {selectedMessage.text}
                        </pre>
                      )}
                    </div>
                    
                    <div className="mt-8 md:mt-12 flex justify-center">
                      <button 
                        onClick={() => setSelectedMessage(null)}
                        className="w-full md:w-auto btn-secondary !px-12 md:!px-16 !py-4 md:!py-5 !rounded-xl md:!rounded-2xl text-[10px] md:text-sm font-black uppercase tracking-[0.3em] italic border-white/5 hover:border-primary/30 group shadow-2xl"
                      >
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        <span>Return to Inbox</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8 md:space-y-12">
            <AdPlaceholder type="vertical" className="hidden lg:flex" />
            
            <div className="glass-card space-y-6 md:space-y-8 relative overflow-hidden group p-6 md:p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
              <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white">Security Specs</h3>
              <ul className="space-y-5 md:space-y-6">
                {[
                  { icon: ShieldCheck, title: 'ZERO REGISTRATION', desc: 'No identity traces or personal logs.', color: 'text-emerald-500' },
                  { icon: Zap, title: 'QUANTUM SPEED', desc: 'Real-time packet delivery architecture.', color: 'text-yellow-500' },
                  { icon: Globe, title: 'GLOBAL NODES', desc: 'Proxied through 12+ international domains.', color: 'text-blue-500' },
                ].map((item, i) => (
                  <li key={i} className="flex space-x-4 md:space-x-5 group/item">
                    <div className="bg-dark/50 p-3 md:p-3.5 rounded-xl md:rounded-2xl h-fit border border-white/5 group-hover/item:border-primary/30 transition-colors">
                      <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${item.color}`} />
                    </div>
                    <div className="space-y-0.5 md:space-y-1">
                      <h4 className="font-black text-white text-[11px] md:text-sm uppercase tracking-widest italic group-hover/item:text-primary transition-colors">{item.title}</h4>
                      <p className="text-[10px] md:text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card bg-primary/[0.03] border-primary/20 relative overflow-hidden p-6 md:p-8">
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />
              <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter text-white mb-3 md:mb-4">Newsletter</h3>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 md:mb-8 leading-relaxed">Intelligence on digital privacy & security updates.</p>
              <form onSubmit={handleSubscribe} className="space-y-3 md:space-y-4 relative z-10">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your terminal email" 
                  className="w-full bg-dark/60 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-3.5 md:py-4 text-xs md:text-sm focus:outline-none focus:border-primary/50 transition-all font-mono italic"
                  disabled={subscribing}
                />
                <button 
                  type="submit" 
                  className="w-full btn-primary !py-3.5 md:!py-4 !rounded-xl md:!rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic"
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <span>Subscribe to Intel</span>
                  )}
                </button>
              </form>
            </div>
          </aside>
        </div>

        {/* Blog Preview Section at the Bottom */}
        <section className="mt-20 md:mt-32 space-y-10 md:space-y-16 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8 relative z-10 text-center md:text-left">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">Top Blogs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Privacy Tips</span>
              </h2>
              <p className="text-gray-400 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] max-w-xl">
                Stay updated with the latest security trends and privacy tips.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="group flex items-center space-x-3 text-white font-black uppercase tracking-[0.2em] italic text-[10px] md:text-xs hover:text-primary transition-colors"
            >
              <span>View All Articles</span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-dark transition-all duration-500">
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
            {latestBlogs.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>

        <div className="mt-12 md:mt-16">
          <AdPlaceholder type="small" className="mx-auto" />
        </div>
      </main>

      <Footer />
      
      <style jsx global>{`
        .email-viewer-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
        }
        .email-viewer-content a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 700;
        }
        .email-viewer-content table {
          width: 100% !important;
          border-collapse: collapse;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
