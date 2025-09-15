import { Article } from '@/lib/data';
import { getTrendingArticles, getArticlesByCategory } from '@/lib/relatedArticles';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/data';

interface ContentRecommendationsProps {
  currentArticle?: Article;
  allArticles: Article[];
  className?: string;
}

export default function ContentRecommendations({ 
  currentArticle, 
  allArticles, 
  className = "" 
}: ContentRecommendationsProps) {
  // Get trending articles
  const trendingArticles = getTrendingArticles(allArticles, currentArticle?.id, 3);
  
  // Get articles from popular categories
  const popularCategories = ['Tournament Preview', 'LPGA Analysis', 'Tournament Golf'];
  const categoryArticles = popularCategories.flatMap(category => 
    getArticlesByCategory(category, allArticles, currentArticle?.id, 1)
  ).slice(0, 2);

  const recommendedArticles = [
    ...trendingArticles.slice(0, 2),
    ...categoryArticles
  ].slice(0, 4);

  if (recommendedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Recommended for You</h2>
        <p className="text-sm text-gray-600">More LPGA coverage you might enjoy</p>
      </div>
      
      <div className="space-y-4">
        {recommendedArticles.map((article, index) => (
          <article key={article.id} className="group">
            <Link href={`/news/${article.slug}`} className="block">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={article.image.src}
                      alt={article.image.alt}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Trending badge for first article */}
                  {index === 0 && (
                    <div className="mb-1">
                      <span className="inline-flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                        Trending
                      </span>
                    </div>
                  )}
                  
                  {/* Category badge for others */}
                  {index > 0 && (
                    <div className="mb-1">
                      <span className="inline-block text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                    </div>
                  )}
                  
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors mb-1">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      
      {/* View more link */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link 
          href="/news" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          Explore All Articles
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
