import { getArticleBySlug, getArticles, formatDate, calculateReadTime } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PrintButton from './PrintButton';
import EmailShareButton from './EmailShareButton';

import BlueskyShareButton from './BlueskyShareButton';
import RedditShareButton from './RedditShareButton';
import CopyUrlButton from './CopyUrlButton';
import MarkdownContent from '@/components/MarkdownContent';
import TagList from '@/components/TagList';
import AuthorCalloutServer from '@/components/AuthorCalloutServer';
import ArticleSections from '@/components/ArticleSections';
import ArticleJsonLd from '@/components/ArticleJsonLd';
import LatestArticle from '@/components/LatestArticle';
import ReadingProgress from '@/components/ReadingProgress';
import EngagementAnalytics from '@/components/EngagementAnalytics';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found - The Birdie Briefing',
      description: 'The article you are looking for could not be found.',
    };
  }

  const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/${article.slug}`;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}${article.image.src}`;

  return {
    title: `${article.title} - The Birdie Briefing`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: 'The Birdie Briefing',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.image.alt,
        },
      ],
      locale: 'en_US',
      type: 'article',
      authors: [article.author],
      publishedTime: article.date,
      modifiedTime: article.date,
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  console.log('Looking for article with slug:', resolvedParams.slug);
  const article = await getArticleBySlug(resolvedParams.slug);
  console.log('Found article:', article);

  if (!article) {
    console.log('Article not found, calling notFound()');
    notFound();
  }

  const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/${article.slug}`;

  return (
    <>
      <ArticleJsonLd article={article} url={articleUrl} />
      <ReadingProgress />
      <EngagementAnalytics 
        articleId={article.id}
        articleTitle={article.title}
        category={article.category}
      />
      <div className="bg-white min-h-screen">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 article-container">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article Content */}
          <main className="flex-1 max-w-4xl">
            <article className="bg-white">
              {/* Print Logo - Only visible when printing */}
              <div className="hidden print:block print-logo">
                <div className="logo-text">The Birdie Briefing</div>
                <div className="logo-subtitle">Celebrating Women in Golf</div>
              </div>

              <header className="mb-8 article-header">
                {/* Category Tag - Hidden in print */}
                <div className="mb-6 print:hidden">
                  <Link href="/news" className="inline-block text-primary-500 font-semibold text-lg border-b-2 border-primary-500 pb-1">
                    {article.category}
                  </Link>
                </div>

                {/* Article Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight article-title break-words">
                  {article.title}
                </h1>

                {/* Author, Date, and Read Time */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 article-meta">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">By</span>
                    <Link
                      href={article.authorId === "george-hack" ? "/about#george-hack" : "/about"}
                      className="text-primary-500 hover:text-primary-600 font-medium article-author"
                    >
                      {article.author}
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time className="article-date" dateTime={article.date}>
                      Published {formatDate(article.date)}
                    </time>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {calculateReadTime(article.content)} min read
                    </span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="mb-8 article-image">
                  <figure>
                    <div className="aspect-[16/10] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <Image
                        src={article.image.src}
                        alt={article.image.alt}
                        width={800}
                        height={500}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 800px"
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <figcaption className="text-sm text-gray-600 border-b border-gray-200 pb-4 article-image-caption">
                      <div>
                        {article.image.caption && (
                          <MarkdownContent
                            content={article.image.caption}
                            className="text-sm text-gray-600"
                          />
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 italic">
                        Photo courtesy: {article.image.courtesy && (
                          <MarkdownContent
                            content={article.image.courtesy}
                            className="inline"
                            isCourtesy={true}
                          />
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none lg:max-w-3xl xl:max-w-4xl article-content break-words overflow-hidden">
                {article.content.map((paragraph, index) => (
                  paragraph && (
                    <MarkdownContent
                      key={index}
                      content={paragraph}
                      className="mb-6 text-lg text-gray-800 leading-relaxed"
                    />
                  )
                ))}
              </div>

              {/* Article Sections */}
              <ArticleSections sections={article.sections} />

              {/* Author Callout */}
              <AuthorCalloutServer
                message={article.callout}
                calloutType={article.calloutType}
                authorId={article.authorId}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Tags</h3>
                <TagList tags={article.tags} size="md" />
              </div>

              {/* Social Sharing */}
              <div className="mt-12 pt-8 border-t border-gray-200 social-sharing">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <BlueskyShareButton
                      title={article.title}
                      excerpt={article.excerpt}
                    />
                    <RedditShareButton
                      title={article.title}
                    />
                    <EmailShareButton
                      title={article.title}
                      excerpt={article.excerpt}
                    />
                    <CopyUrlButton />
                    <PrintButton className="print-button" />
                  </div>
                </div>
              </div>
            </article>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky" style={{ top: 'calc(var(--header-height) + 1rem)' }}>
              {/* Latest Articles */}
              <LatestArticle />
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
