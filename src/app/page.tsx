import Link from 'next/link';
import Image from 'next/image';
import NewsletterSignup from '@/components/NewsletterSignup';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import Socials from '@/components/Socials';
import VideoBackground from '@/components/VideoBackground';
import { getArticles, formatDate } from '@/lib/data';

export default function Home() {
  const articles = getArticles();
  const latestNewsArticle = articles[0]; // Get the most recent article


  return (
    <div className="bg-white">
      {/* Masthead Section */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Text Content with White Background */}
            <div className="bg-white rounded-lg p-8 lg:p-12">
              {/* Main Headlines */}
              <div className="text-center mb-16">
                <h1 className="text-6xl lg:text-8xl xl:text-9xl font-heading text-primary-500 leading-none mb-4">
                  The Birdie
                </h1>
                <h2 className="text-6xl lg:text-8xl xl:text-9xl font-heading text-secondary-500 leading-none mb-12">
                  Briefing
                </h2>
              </div>

              {/* Introduction */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                  The Birdie Briefing is your go-to source for celebrating women in golf. We amplify the stories, achievements, and voices of women on and off the course. Dive into LPGA coverage, tournament insights, and exclusive content that brings the vibrant world of women's professional golf to life.
                </p>

                {/* Author Attribution */}
                <div className="flex items-center justify-center space-x-4 mb-12">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-heading">M</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Marie Hack</p>
                    <p className="text-sm text-gray-600">Editor & Founder</p>
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link
                    href="/news"
                    className="bg-primary-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                  >
                    Latest Coverage
                  </Link>
                  <Link
                    href="/about"
                    className="text-lg font-medium text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      {latestNewsArticle && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                  Latest News
                </h2>
                <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Stay updated with the latest LPGA news and insights.
              </p>
            </div>

                        <div className="max-w-6xl mx-auto">
              <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-1/2">
                    <div className="aspect-[16/10] bg-gray-200">
                      <Image
                        src={latestNewsArticle.image.src}
                        alt={latestNewsArticle.image.alt}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 p-8">
                    {/* Category */}
                    <span className="inline-block text-primary-500 font-semibold text-sm uppercase tracking-wide mb-3">
                      {latestNewsArticle.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      <Link
                        href={`/news/${latestNewsArticle.slug}`}
                        className="hover:text-primary-500 transition-colors"
                      >
                        {latestNewsArticle.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {latestNewsArticle.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>By {latestNewsArticle.author}</span>
                        <span>•</span>
                        <time dateTime={latestNewsArticle.date}>
                          {formatDate(latestNewsArticle.date)}
                        </time>
                      </div>
                      <Link
                        href={`/news/${latestNewsArticle.slug}`}
                        className="text-primary-500 hover:text-primary-600 font-medium text-sm inline-flex items-center"
                      >
                        Read article →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>

              {/* View All News Link */}
              <div className="text-center mt-12">
                <Link
                  href="/news"
                  className="bg-primary-500 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-600 transition-all duration-300 hover:-translate-y-1"
                >
                  View All News
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
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                Listen to Our Podcast
              </h2>
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
            </div>
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
      <section className="bg-cream-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                Stay Connected
              </h2>
              <div className="flex-1 h-px bg-gray-300 max-w-32"></div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get the latest LPGA news, tournament updates, and exclusive content delivered to your inbox.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* Follow Along Section */}
      <section className="bg-primary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Socials />
        </div>
      </section>

      {/* Call to Action */}
              <section className="bg-secondary-500 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight title-overlap">
                Join the The Birdie Briefing Community
              </h2>
              <div className="flex-1 h-px bg-gray-200 max-w-32"></div>
            </div>
            <p className="text-xl text-gray-200 leading-relaxed mb-12 max-w-3xl mx-auto">
              Connect with fellow golf enthusiasts, attend exclusive events, and be part of the movement
              celebrating women in golf.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="https://discord.gg/Chbmx2f6Xv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary-500 px-8 py-4 rounded-md font-medium text-lg border border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:-translate-y-1 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
                Join Discord
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
