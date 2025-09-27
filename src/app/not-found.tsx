import Link from 'next/link';
import VideoBackground from '@/components/VideoBackground';

export default function NotFound() {
  return (
    <div className="bg-white">
      {/* Hero Section - Matching Podcast Page */}
      <section className="relative overflow-hidden">
        {/* Video Background */}
        <VideoBackground />

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Text Content with White Background */}
            <div className="bg-white rounded-lg p-8 lg:p-12">
              <div className="text-center">
                {/* 404 Number */}
                <div className="mb-8">
                  <h1 className="text-8xl lg:text-9xl font-bold text-gray-200 mb-4">
                    404
                  </h1>
                </div>

                {/* Main Heading */}
                <div className="mb-8">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="text-primary-500">Page</span>{' '}
                    <span className="text-secondary-500">Not Found</span>
                  </h2>
                </div>

                {/* Description */}
                <div className="mb-12 text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
                  <p className="mb-4">
                    Looks like this page has taken a detour into the rough. The content you're looking for might have been moved, deleted, or never existed.
                  </p>
                  <p>
                    Don't worry though - you can always head back to the clubhouse and explore our latest articles, podcast episodes, and golf insights.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-block bg-primary-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg"
                  >
                    Back to Home
                  </Link>
                  <Link
                    href="/news"
                    className="inline-block bg-secondary-500 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-secondary-600 transition-all duration-300 shadow-lg"
                  >
                    Latest News
                  </Link>
                </div>

                {/* Quick Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Quick Navigation
                  </h3>
                  <div className="flex flex-wrap justify-center gap-6">
                    <Link
                      href="/"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      href="/news"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      News
                    </Link>
                    <Link
                      href="/podcast"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Podcast
                    </Link>
                    <Link
                      href="/rankings"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Rankings
                    </Link>
                    <Link
                      href="/schedule"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Schedule
                    </Link>
                    <Link
                      href="/scorecard"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Scorecard
                    </Link>
                    <Link
                      href="/solheim-cup/about"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Solheim Cup
                    </Link>
                    <Link
                      href="/about"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact-us"
                      className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
