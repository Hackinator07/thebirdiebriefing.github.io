'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Article } from '@/lib/data';

// Helper functions moved here to avoid importing from data.ts
function formatDate(dateString: string): string {
  const parts = dateString.split('-');
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (parts.length === 3) {
    const year = Number(parts[0]);
    const monthIndex = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    if (
      Number.isFinite(year) &&
      Number.isFinite(monthIndex) &&
      monthIndex >= 0 && monthIndex <= 11 &&
      Number.isFinite(day)
    ) {
      return `${months[monthIndex]} ${day}, ${year}`;
    }
  }

  const date = new Date(dateString);
  const month = months[date.getUTCMonth()] ?? '';
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

function calculateReadTime(content: string[]): number {
  const wordsPerMinute = 225;
  const totalWords = content.reduce((count, paragraph) => {
    return count + paragraph.split(' ').length;
  }, 0);
  return Math.ceil(totalWords / wordsPerMinute);
}
import MarkdownContent from '@/components/MarkdownContent';

interface NewsListProps {
  articles: Article[];
}

export default function NewsList({ articles }: NewsListProps) {
  const [visibleArticles, setVisibleArticles] = useState(5); // Start with 5 articles
  const [loading, setLoading] = useState(false);

  // Simulate infinite scroll
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        !loading &&
        visibleArticles < articles.length
      ) {
        setLoading(true);
        // Simulate loading delay
        setTimeout(() => {
          setVisibleArticles(prev => Math.min(prev + 5, articles.length)); // Load 5 more articles
          setLoading(false);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, visibleArticles, articles.length]);

  return (
    <>
      <div className="space-y-16">
        {articles.slice(0, visibleArticles).map((article, index) => (
          <article key={article.id} className="bg-white">
            {/* Separator line for articles after the first */}
            {index > 0 && (
              <div className="border-t border-gray-200 mb-16"></div>
            )}

            {/* Category Tag */}
            <div className="mb-6">
              <Link
                href={article.category === 'Tournament Preview' ? '/news/tournament-preview' :
                      article.category === 'Tournament Golf' ? '/news/tournament-golf' :
                      article.category === 'LPGA Analysis' ? '/news/lpga-analysis' :
                      article.category === 'Opinion' ? '/news/opinion' : '/news'}
                className="inline-block text-primary-500 font-semibold text-lg border-b-2 border-primary-500 pb-1"
              >
                {article.category}
              </Link>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <Link
                href={`/news/${article.slug}`}
                className="hover:text-primary-500 transition-colors"
              >
                {article.title}
              </Link>
            </h1>

            {/* Author, Date, and Read Time */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">By</span>
                <Link
                  href={article.authorId === "george-hack" ? "/about#george-hack" : "/about"}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  {article.author}
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time dateTime={article.date}>
                  Published {formatDate(article.date)}
                </time>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {calculateReadTime(article.content)} min read
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <figure>
                <div className="aspect-[16/10] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <Image
                    src={article.image.src}
                    alt={article.image.alt}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <figcaption className="text-sm text-gray-600 border-b border-gray-200 pb-4">
                  <div>
                    {article.image.caption && (
                      <MarkdownContent
                        content={article.image.caption}
                        className="text-sm text-gray-600"
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 italic">
                    Photo courtesy: {article.image.courtesy && (
                      <MarkdownContent
                        content={article.image.courtesy}
                        className="inline text-xs text-gray-500 italic [&_p]:text-xs [&_p]:text-gray-500 [&_p]:italic [&_p]:mb-0 [&_p]:leading-none [&_p]:inline"
                      />
                    )}
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Article Content Summary */}
            <div className="prose prose-lg max-w-none mb-8">
              {/* Show first paragraph as featured text */}
              {article.content[0] && (
                <MarkdownContent content={article.content[0]} />
              )}
            </div>

            {/* Read Full Article Link */}
            <div className="text-left">
              <Link
                href={`/news/${article.slug}`}
                className="text-primary-500 hover:text-primary-600 font-medium text-base inline-flex items-center"
              >
                Read article →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-primary-500 bg-white border border-primary-200">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading more articles...
          </div>
        </div>
      )}

      {/* End of articles message */}
      {!loading && visibleArticles >= articles.length && articles.length > 1 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end of our latest articles.</p>
        </div>
      )}
    </>
  );
}
