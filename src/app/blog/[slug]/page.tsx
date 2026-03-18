import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPost } from '@/lib/blogData';
import { getBlogBySlug } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import { Calendar, Clock, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import AdPlaceholder from '@/components/AdPlaceholder';
import parse from 'html-react-parser';
import { getParserOptions } from '@/lib/parser';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post: BlogPost = await getBlogBySlug(params.slug);
    if (!post) return { title: 'Post Not Found' };

    return {
      title: post.title,
      description: post.excerpt || `Read our latest article: ${post.title}. Stay updated with digital privacy and security trends.`,
      keywords: [post.category.toLowerCase(), 'privacy blog', 'security tips', 'temp mail'],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch (error) {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: BlogPost | null = null;
  try {
    post = await getBlogBySlug(params.slug);
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark selection:bg-primary/30 selection:text-primary">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
        {/* Ad Header */}
        <div className="mb-8 md:mb-12">
          <AdPlaceholder type="leaderboard" className="mx-auto" />
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-10 md:space-y-16">
          <Link 
            href="/blog" 
            className="inline-flex items-center space-x-3 text-gray-400 hover:text-primary transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Back to articles</span>
          </Link>

          <article className="space-y-8 md:space-y-12">
            <header className="space-y-6 md:space-y-10">
              <div className="flex items-center space-x-4 md:space-x-6 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                <span className="bg-primary/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-primary/20">{post.category}</span>
                <div className="flex items-center space-x-1.5 md:space-x-2 text-gray-400">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{post.date}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-tight md:leading-[0.9] max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 md:gap-8 py-8 md:py-10 border-y border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl md:text-2xl border border-primary/20">
                    {post.author[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-black text-white uppercase tracking-wider">{post.author}</span>
                    <div className="flex items-center space-x-1.5 md:space-x-2 text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                      <Clock className="w-3 md:w-3.5 md:h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <ShareButtons title={post.title} />
              </div>
            </header>

            <div 
              className="prose prose-invert prose-primary max-w-none 
                prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 md:prose-h2:mt-16 prose-h2:mb-6 md:prose-h2:mb-8
                prose-p:text-gray-300 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-p:font-medium
                prose-ul:text-gray-300 prose-li:my-3 md:prose-li:my-4
                prose-strong:text-primary prose-strong:font-black
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              "
            >
              {parse(post.content, getParserOptions())}
            </div>

            <div className="mt-12 md:mt-16">
              <AdPlaceholder type="leaderboard" className="mx-auto" />
            </div>
          </article>

          <div className="pt-16 md:pt-24 border-t border-white/5">
            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-16 text-center space-y-6 md:space-y-10">
              <div className="inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
                <span className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">Ready to use AgencyMail?</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight md:leading-[0.9]">
                Get your instant email address now
              </h2>
              <p className="text-sm md:text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                No registration, no password, just a secure disposable email address to protect your identity online.
              </p>
              <Link 
                href="/"
                className="inline-block bg-primary text-dark font-black px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl text-xs md:text-base uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-primary/20 active:scale-95"
              >
                Generate Email
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
