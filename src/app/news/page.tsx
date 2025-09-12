import { getArticles } from '@/lib/articles';
import NewsListJsonLd from '@/components/NewsListJsonLd';
import NewsListServer from '@/components/NewsListServer';
import NewsletterSignup from '@/components/NewsletterSignup';
import LatestArticle from '@/components/LatestArticle';

export default async function NewsPage() {
  const articles = await getArticles();
  const newsUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news`;

  return (
    <>
      <NewsListJsonLd articles={articles} url={newsUrl} />
      <div className="bg-white min-h-screen">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Articles Content */}
            <main className="flex-1 max-w-4xl">
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">
                    News
                  </h1>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>



              {/* Articles Feed */}
              <section className="pb-16">
                <NewsListServer />
              </section>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <LatestArticle />

                {/* Newsletter Signup */}
                <div className="mt-6 bg-gray-50 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Stay Updated</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Get the latest LPGA news, tournament updates, and exclusive content delivered to your inbox.
                  </p>
                  <NewsletterSignup />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
