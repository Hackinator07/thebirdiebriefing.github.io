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
import AuthorCallout from '@/components/AuthorCallout';
import ArticleSections from '@/components/ArticleSections';
import ArticleJsonLd from '@/components/ArticleJsonLd';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found - The Birdie Briefing',
      description: 'The article you are looking for could not be found.',
    };
  }

  return {
    title: `${article.title} - The Birdie Briefing`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  console.log('Looking for article with slug:', resolvedParams.slug);
  const article = getArticleBySlug(resolvedParams.slug);
  console.log('Found article:', article);

  if (!article) {
    console.log('Article not found, calling notFound()');
    notFound();
  }

  const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/news/${article.slug}`;

  return (
    <>
      <ArticleJsonLd article={article} url={articleUrl} />
      <div className="bg-white min-h-screen">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 article-container">
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight article-title">
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
                            className="inline text-xs text-gray-500 italic [&_p]:text-xs [&_p]:text-gray-500 [&_p]:italic [&_p]:mb-0 [&_p]:leading-none [&_p]:inline"
                          />
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none article-content">
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
              <AuthorCallout
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
            <div className="lg:sticky lg:top-24">
              <section className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest News</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Stay Updated with LPGA News
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Get the latest updates, tournament results, and player insights delivered to your inbox.
                    </p>
                    <Link href="/news" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium text-sm">
                      Read More
                      <svg className="ml-1 w-4 h-4" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.45262 0.738643L9.75592 5.92386C10.0814 6.24205 10.0814 6.75794 9.75592 7.07614L4.45262 12.2614C4.12718 12.5795 3.59955 12.5795 3.27411 12.2614C2.94867 11.9432 2.94867 11.4273 3.27411 11.1091L7.15482 7.31478H0V5.68522H7.15482L3.27411 1.89091C2.94867 1.57272 2.94867 1.05683 3.27411 0.738643C3.59955 0.420452 4.12718 0.420452 4.45262 0.738643Z" fill="currentColor"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
