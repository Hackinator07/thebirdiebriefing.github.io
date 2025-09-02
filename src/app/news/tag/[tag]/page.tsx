import { getArticlesByTag, getArticles } from '@/lib/articles';
import { notFound } from 'next/navigation';
import NewsListJsonLd from '@/components/NewsListJsonLd';
import NewsList from '@/components/NewsList';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  const allTags = new Set<string>();
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      allTags.add(tag);
    });
  });

  return Array.from(allTags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  const articles = await getArticlesByTag(tag);
  
  if (articles.length === 0) {
    return {
      title: 'Tag Not Found - The Birdie Briefing',
    };
  }

  return {
    title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} - News - The Birdie Briefing`,
    description: `Latest ${tag} articles from The Birdie Briefing. LPGA women's golf news, tournament coverage, and exclusive content.`,
    openGraph: {
      title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} - News - The Birdie Briefing`,
      description: `Latest ${tag} articles from The Birdie Briefing. LPGA women's golf news, tournament coverage, and exclusive content.`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/tag/${resolvedParams.tag}`,
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
      title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} - News - The Birdie Briefing`,
      description: `Latest ${tag} articles from The Birdie Briefing. LPGA women's golf news, tournament coverage, and exclusive content.`,
      images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/images/logo.png`],
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  const articles = await getArticlesByTag(tag);
  
  if (articles.length === 0) {
    notFound();
  }

  const newsUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/tag/${resolvedParams.tag}`;

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
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
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
