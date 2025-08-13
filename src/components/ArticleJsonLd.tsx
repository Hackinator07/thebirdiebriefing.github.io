import Script from 'next/script';

interface ArticleJsonLdProps {
  article: {
    title: string;
    excerpt: string;
    content: string[];
    author: string;
    authorId?: string;
    date: string;
    image: {
      src: string;
      alt: string;
    };
    slug: string;
    category: string;
    tags: string[];
  };
  url: string;
}

export default function ArticleJsonLd({ article, url }: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}${article.image.src}`,
      "alt": article.image.alt
    },
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/about${article.authorId === 'george-hack' ? '#george-hack' : ''}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Birdie Briefing",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.birdiebriefing.com'}/logo.png`
      }
    },
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": article.category,
    "keywords": article.tags.join(", "),
    "wordCount": article.content.join(" ").split(" ").length,
    "timeRequired": `PT${Math.max(1, Math.ceil(article.content.join(" ").split(" ").length / 200))}M`, // Rough estimate: 200 words per minute
    "url": url
  };

  return (
    <Script
      id="article-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
