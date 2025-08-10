'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getArticles, formatDate, calculateReadTime } from '@/lib/data';
import LinkifyText from '@/app/news/[slug]/LinkifyText';

export default function NewsPage() {
  const [articles] = useState(getArticles());
  const [visibleArticles, setVisibleArticles] = useState(1);
  const [loading, setLoading] = useState(false);

  // Simulate infinite scroll
  useEffect(() => {
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
          setVisibleArticles(prev => Math.min(prev + 1, articles.length));
          setLoading(false);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, visibleArticles, articles.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Articles Content */}
            <main className="flex-1 max-w-4xl">
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                    News
                  </h1>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>

            {/* Articles Feed */}
            <section className="pb-16">
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
                        href="/news"
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
                          href="/about"
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
                          <div>{article.image.caption}</div>
                          <div className="text-xs text-gray-500 mt-1 italic">Photo courtesy: {article.image.courtesy}</div>
                        </figcaption>
                      </figure>
                    </div>

                    {/* Article Content Summary */}
                    <div className="prose prose-lg max-w-none mb-8">
                      {/* Show first paragraph as featured text */}
                      <p className="mb-6 text-lg text-gray-800 leading-relaxed">
                        <LinkifyText text={article.content[0]} />
                      </p>
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
            </section>
          </main>

          {/* Sidebar - Empty for now but maintains layout consistency */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Sidebar content can be added here in the future */}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
