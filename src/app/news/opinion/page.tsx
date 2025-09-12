import { getArticlesByTag } from '@/lib/articles';
import NewsListJsonLd from '@/components/NewsListJsonLd';
import NewsList from '@/components/NewsList';
import LatestArticle from '@/components/LatestArticle';

export async function generateMetadata() {
  const articles = await getArticlesByTag('Opinion');
  
  return {
    title: 'Opinion - News - The Birdie Briefing',
    description: 'Latest opinion articles from The Birdie Briefing. Expert opinions and commentary on LPGA women\'s golf news and exclusive content.',
    openGraph: {
      title: 'Opinion - News - The Birdie Briefing',
      description: 'Latest opinion articles from The Birdie Briefing. Expert opinions and commentary on LPGA women\'s golf news and exclusive content.',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/opinion`,
      siteName: 'The Birdie Briefing',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`,
          width: 1200,
          height: 630,
          alt: 'The Birdie Briefing Logo',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Opinion - News - The Birdie Briefing',
      description: 'Latest opinion articles from The Birdie Briefing. Expert opinions and commentary on LPGA women\'s golf news and exclusive content.',
      images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
    },
  };
}

export default async function OpinionPage() {
  const articles = await getArticlesByTag('Opinion');
  const newsUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/opinion`;

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
                    Opinion
                  </h1>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              </div>

              {/* Articles Feed */}
              <section className="pb-16">
                <NewsList articles={articles} />
              </section>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <LatestArticle />
            </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
