import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the terms and conditions for using AgencyMail temporary email services.',
  keywords: ['terms of service', 'agencymail terms', 'user agreement', 'temp mail terms'],
};

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full prose prose-invert">
        <AdPlaceholder type="leaderboard" className="mb-12" />
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-gray-400">Last updated: March 18, 2026</p>
        
        <section className="mt-8 space-y-6 text-gray-300">
          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use AgencyMail if you do not agree to take all of the terms and conditions stated on this page.</p>
          
          <h2 className="text-2xl font-bold text-white">1. Use License</h2>
          <p>Permission is granted to temporarily use the materials (information or software) on AgencyMail's website for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl font-bold text-white">2. Disclaimer</h2>
          <p>The materials on AgencyMail's website are provided on an 'as is' basis. AgencyMail makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="text-2xl font-bold text-white">3. Limitations</h2>
          <p>In no event shall AgencyMail or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AgencyMail's website, even if AgencyMail or an AgencyMail authorized representative has been notified orally or in writing of the possibility of such damage.</p>

          <h2 className="text-2xl font-bold text-white">4. Prohibited Uses</h2>
          <p>You may not use AgencyMail for any illegal purposes, including but not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sending spam or unauthorized advertisements</li>
            <li>Distributing malware or viruses</li>
            <li>Harassing, abusing, or harming another person</li>
            <li>Violating any applicable local, state, national, or international law</li>
          </ul>
        </section>

        <AdPlaceholder type="leaderboard" className="mt-16" />
      </main>
      <Footer />
    </div>
  );
}
