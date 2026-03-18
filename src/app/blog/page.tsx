import { BlogPost } from '@/lib/blogData';
import { getBlogs } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlaceholder from '@/components/AdPlaceholder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stay updated with the latest trends in digital privacy, security, and temporary email services. Our expert articles help you navigate the internet safely.',
  keywords: ['privacy blog', 'security articles', 'temp mail guide', 'anonymous email tips'],
};

export default async function BlogIndex() {
  // force new build
  let blogs: BlogPost[] = [];
  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
  }

  return (
    <div className="min-h-screen bg-dark selection:bg-primary/30 selection:text-primary">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        {/* Ad Header */}
        <AdPlaceholder type="leaderboard" className="mx-auto mb-12" />
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 space-y-16 md:space-y-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
              <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.3em] italic">Latest Articles</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-tight md:leading-[0.85]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/80">AgencyMail</span> Blog
            </h1>
            
            <p className="text-gray-400 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Stay updated with the latest trends in digital privacy, security, and temporary email services. 
              Our expert articles help you navigate the internet safely.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {blogs.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
            
            <AdPlaceholder type="leaderboard" className="mx-auto" />
          </div>

          <div className="p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 relative overflow-hidden text-center space-y-6 md:space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-4 md:space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">Want to stay protected?</h2>
              <p className="text-sm md:text-gray-300 max-w-xl mx-auto font-medium">
                Subscribe to our newsletter for exclusive privacy intelligence and security updates.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
