'use client';

import Link from 'next/link';
import { Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '@/lib/blogData';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
    >
      <div className="p-6 md:p-8 space-y-4 flex-grow">
        <div className="flex items-center space-x-3 md:space-x-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <span className="bg-primary/10 px-2.5 md:px-3 py-1 rounded-full border border-primary/20">{post.category}</span>
          <div className="flex items-center space-x-1 md:space-x-1.5 text-gray-400">
            <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-lg md:text-xl font-black text-white group-hover:text-primary transition-colors leading-tight italic uppercase tracking-tighter">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="pt-4 md:pt-6 flex items-center justify-between border-t border-white/5 mt-auto">
          <div className="flex items-center space-x-2.5 md:space-x-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-black text-[10px] md:text-xs border border-primary/20">
              {post.author[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-wider">{post.author}</span>
              <div className="flex items-center space-x-1 text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                <Clock className="w-2 md:w-2.5 md:h-2.5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-primary group-hover:text-dark group-hover:border-primary transition-all duration-300"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
