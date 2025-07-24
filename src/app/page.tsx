import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterSignup';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import InstagramFeed from '@/components/InstagramFeed';
import { getNewsArticles, getLatestWeeklyUpdate, getFeaturedInstagramPosts, formatDate } from '@/lib/data';

export default function Home() {
  const latestNews = getNewsArticles().slice(0, 3);
  const latestUpdate = getLatestWeeklyUpdate();
  const featuredInstagramPosts = getFeaturedInstagramPosts();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              Golf Girl Gazette
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-gray-100 mb-12 max-w-3xl mx-auto">
              Your premier source for LPGA women&apos;s golf news, tournament coverage, and exclusive content.
              Celebrating the stories, achievements, and voices of women in golf.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/news"
                className="bg-primary-500 text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
              >
                Latest News
              </Link>
              <Link
                href="/podcasts"
                className="text-lg font-medium text-white hover:text-gray-200 transition-colors"
              >
                Listen to Podcasts →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Latest News
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Stay updated with the latest news, insights, and stories from the world of women&apos;s golf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {latestNews.map((article) => (
              <article key={article.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 mb-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image Placeholder</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <time dateTime={article.date} className="font-medium">{formatDate(article.date)}</time>
                    <span className="mx-2">•</span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
                    <Link href={`/article/lpga-golf/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <Link
                    href={`/article/lpga-golf/${article.slug}`}
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm inline-flex items-center"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/news"
              className="bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
            >
              View All News
            </Link>
          </div>
        </div>
      </section>

      {/* Marie's Weekly Update */}
      {latestUpdate && (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    <Link href="/article/lpga-golf/maries-weekly-update" className="hover:text-primary-500 transition-colors">
                      {latestUpdate.title}
                    </Link>
                  </h3>
                  <time dateTime={latestUpdate.date} className="text-sm text-gray-500 font-medium">
                    {formatDate(latestUpdate.date)}
                  </time>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {latestUpdate.content.substring(0, 300)}...
                </p>
                <Link
                  href="/article/lpga-golf/maries-weekly-update"
                  className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center"
                >
                  Read full update →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Spotify Embed Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Listen to Our Podcast
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deep into the world of women's golf with our in-depth podcast episodes featuring player interviews, tournament analysis, and behind-the-scenes insights.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SpotifyEmbed />
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Stay Connected
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get the latest LPGA news, tournament updates, and exclusive content delivered to your inbox.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      {featuredInstagramPosts.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Follow Us on Instagram
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Get behind-the-scenes content, tournament highlights, and exclusive moments from the LPGA tour.
              </p>
            </div>
            <InstagramFeed
              posts={featuredInstagramPosts}
              maxPosts={3}
              className="mb-8"
            />
            <div className="text-center mt-12">
              <a
                href="https://www.instagram.com/golfgirlgazette"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-md font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Follow @golfgirlgazette
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Join the Golf Girl Gazette Community
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed mb-12 max-w-3xl mx-auto">
              Connect with fellow golf enthusiasts, attend exclusive events, and be part of the movement
              celebrating women in golf.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/events"
                className="bg-white text-primary-500 px-8 py-4 rounded-md font-medium text-lg border border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                View Events
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium text-white hover:text-gray-200 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
