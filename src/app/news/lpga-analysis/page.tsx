import { getArticlesByTag } from '@/lib/articles';
import NewsListJsonLd from '@/components/NewsListJsonLd';
import NewsList from '@/components/NewsList';

export async function generateMetadata() {
  const articles = await getArticlesByTag('LPGA Analysis');
  
  return {
    title: 'LPGA Analysis - News - The Birdie Briefing',
    description: 'Latest LPGA analysis articles from The Birdie Briefing. In-depth analysis of LPGA women\'s golf news and exclusive content.',
  };
}

export default async function LpgaAnalysisPage() {
  const articles = await getArticlesByTag('LPGA Analysis');
  const newsUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/lpga-analysis`;

  return (
    <>
      <NewsListJsonLd articles={articles} url={newsUrl} />
      <div className="bg-white min-h-screen">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Articles Content */}
            <main className="flex-1 max-w-4xl">
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight title-overlap">
                    LPGA Analysis
                  </h1>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>

              {/* Articles Feed */}
              <section className="pb-16">
                <NewsList articles={articles} />
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
    </>
  );
}
