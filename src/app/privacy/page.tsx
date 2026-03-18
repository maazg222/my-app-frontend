import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the AgencyMail privacy policy. We value your privacy and do not collect personal information for our temporary email service.',
  keywords: ['privacy policy', 'agencymail privacy', 'data protection', 'temp mail privacy'],
};

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 py-16 w-full prose prose-invert">
        <AdPlaceholder type="leaderboard" className="mb-12" />
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-gray-400">Last updated: March 18, 2026</p>
        
        <section className="mt-8 space-y-6 text-gray-300">
          <p>At AgencyMail, accessible from agencymail.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AgencyMail and how we use it.</p>
          
          <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
          <p>AgencyMail is a temporary email service. We do not require any personal information like your name, phone number, or real email address to use our service. We only generate a temporary mailbox for you to use.</p>
          
          <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
          </ul>

          <h2 className="text-2xl font-bold text-white">3. Log Files</h2>
          <p>AgencyMail follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>

          <h2 className="text-2xl font-bold text-white">4. Cookies and Web Beacons</h2>
          <p>Like any other website, AgencyMail uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

          <h2 className="text-2xl font-bold text-white">5. Google DoubleClick DART Cookie</h2>
          <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.</p>
        </section>

        <AdPlaceholder type="leaderboard" className="mt-16" />
      </main>
      <Footer />
    </div>
  );
}
