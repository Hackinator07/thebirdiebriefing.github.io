import { Article } from '@/lib/data';
import { getRelatedArticles } from '@/lib/relatedArticles';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/data';

interface RelatedArticlesProps {
  currentArticle: Article;
  allArticles: Article[];
  maxResults?: number;
  title?: string;
  className?: string;
}

export default function RelatedArticles({ 
  currentArticle, 
  allArticles, 
  maxResults = 3,
  title = "Related Articles",
  className = ""
}: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(currentArticle, allArticles, maxResults);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`mt-12 pt-8 border-t border-gray-200 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">
          Continue exploring LPGA coverage and insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article, index) => (
          <article 
            key={article.id} 
            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Link href={`/news/${article.slug}`}>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  width={400}
                  height={225}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                {/* Category Badge */}
                <div className="mb-2">
                  <span className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>By {article.author}</span>
                  <span>•</span>
                  <span>{formatDate(article.date)}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View More Link */}
      <div className="mt-6 text-center">
        <Link 
          href="/news" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
        >
          View All Articles
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
