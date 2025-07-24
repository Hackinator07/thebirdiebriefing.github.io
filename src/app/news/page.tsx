import Link from 'next/link';
import { getNewsArticles, formatDate } from '@/lib/data';

export const metadata = {
  title: 'Latest News - Golf Girl Gazette',
  description: 'Stay updated with the latest LPGA news, tournament coverage, and exclusive content from Golf Girl Gazette.',
};

export default function NewsPage() {
  const articles = getNewsArticles();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Latest News
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100">
              Stay updated with the latest LPGA news, tournament coverage, and exclusive content.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                {/* Article Image */}
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 mb-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image Placeholder</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Date and Category */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <time dateTime={article.date} className="font-medium">
                      {formatDate(article.date)}
                    </time>
                    <span className="mx-2">•</span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-500 transition-colors">
                    <Link href={`/article/lpga-golf/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {article.author}</span>
                    <Link
                      href={`/article/lpga-golf/${article.slug}`}
                      className="text-primary-500 hover:text-primary-600 font-medium text-sm inline-flex items-center"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
