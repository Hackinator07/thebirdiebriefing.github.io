import { getArticles } from '@/lib/articles';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate, calculateReadTime } from '@/lib/data';
import MarkdownContent from '@/components/MarkdownContent';

export default async function LatestArticle() {
  const articles = await getArticles();
  const latestArticle = articles[0]; // Most recent article (articles are sorted by date)

  if (!latestArticle) {
    return (
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest News</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h3 className="font-medium text-gray-900 mb-2">
              Stay Updated with LPGA News
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Get the latest updates, tournament results, and player insights delivered to your inbox.
            </p>
            <Link href="/news" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm">
              Read More
              <svg className="ml-1 w-4 h-4" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.45262 0.738643L9.75592 5.92386C10.0814 6.24205 10.0814 6.75794 9.75592 7.07614L4.45262 12.2614C4.12718 12.5795 3.59955 12.5795 3.27411 12.2614C2.94867 11.9432 2.94867 11.4273 3.27411 11.1091L7.15482 7.31478H0V5.68522H7.15482L3.27411 1.89091C2.94867 1.57272 2.94867 1.05683 3.27411 0.738643C3.59955 0.420452 4.12718 0.420452 4.45262 0.738643Z" fill="currentColor"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest News</h2>
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
          <Link href={`/news/${latestArticle.slug}`} className="block">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={latestArticle.image.src}
                    alt={latestArticle.image.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="mb-1">
                  <span className="inline-block text-primary-500 font-semibold text-xs border-b border-primary-500 pb-1">
                    {latestArticle.category}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary-500 transition-colors break-words">
                  {latestArticle.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 flex-wrap">
                  <span>By {latestArticle.author}</span>
                  <span>•</span>
                  <span>{formatDate(latestArticle.date)}</span>
                  <span>•</span>
                  <span>{calculateReadTime(latestArticle.content)} min read</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 break-words">
                  {latestArticle.excerpt}
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="pt-2">
          <Link 
            href="/news" 
            className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm"
          >
            View All News
            <svg className="ml-1 w-4 h-4" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.45262 0.738643L9.75592 5.92386C10.0814 6.24205 10.0814 6.75794 9.75592 7.07614L4.45262 12.2614C4.12718 12.5795 3.59955 12.5795 3.27411 12.2614C2.94867 11.9432 2.94867 11.4273 3.27411 11.1091L7.15482 7.31478H0V5.68522H7.15482L3.27411 1.89091C2.94867 1.57272 2.94867 1.05683 3.27411 0.738643C3.59955 0.420452 4.12718 0.420452 4.45262 0.738643Z" fill="currentColor"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
